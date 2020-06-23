import React, {useEffect} from "react";
import {ChatMessageForServer, ChatMessageFromServer} from "../domain/ServerCommunication";
import {ChatState, Message} from "../components/App";
import {Configuration} from "../domain/Configuration";

/**
 * handles all communication events from the server
 * @param socket       The socket which is already connected to the server
 * @param setChatState This function mutates the state of the app. I.e. it will add messages etc. to the app-state
 * @param chatStateRef Reference to the chat state of our app. Used to copy the old state over.
 */
export function setupSocketCommunication(socket: SocketIOClient.Socket,
                                         setChatState: (value: ChatState) => void,
                                         chatStateRef: React.MutableRefObject<ChatState>) {
    useEffect(() => {
        // On connect the server will assign a new UUID to the connecting user
        // Since we broadcast the messages this id then indicates if the message belonged to us or not
        socket.on('new-user-id', (newUserId: string) => {
            setChatState({
                ...chatStateRef.current,
                userId: newUserId
            });
        });
        // New chat message arrives -> add it to the others
        socket.on('new-chat-message', (messageFromServer: ChatMessageFromServer) => {
            const message = {
                username: messageFromServer.username,
                text: messageFromServer.text,
                time: new Date(messageFromServer.time),
                ourMessage: chatStateRef.current.userId === messageFromServer.fromId,
            } as Message;
            setChatState({
                ...chatStateRef.current,
                messages: [...chatStateRef.current.messages, message]
            });
        });
        return () => {
            socket.close();
        }
    }, []);
}

/**
 * Send a new message to the server
 * @param socket        The socket which is already connected to the server
 * @param configuration Our current configuration
 * @param message       The message itself that will be published
 */
export const handleSendMessageToServer = (socket: SocketIOClient.Socket, configuration: Configuration, message: string) => {
    socket.emit('new-chat-message-to-server', {
        username: configuration.username,
        time: new Date(),
        text: message,
    } as ChatMessageForServer);
}

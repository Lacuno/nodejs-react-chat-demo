/**
 * Message format expected by the server
 */
export interface ChatMessageForServer {
    username: string    // UserName of the user who sent the message (= display name)
    text: string        // The message itself
    time: Date          // Time when the message was published
}

/**
 * Chat message returned from the server
 * Date fields are converted to strings since the conversion to Date does not happen automatically
 */
export interface ChatMessageFromServer {
    username: string    // UserName of the user who sent the message (= display name)
    text: string        // The message itself
    time: string        // Time when the message was published
    fromId: string      // The id of the user that sent the message
}

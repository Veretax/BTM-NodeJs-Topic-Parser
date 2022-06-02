'use strict';

class Prompt {
    constructor(message) {
        this._message = message;
    }

    message() {
        return this._message;
    }

    displayPrompt(newMessage) {
        if (newMessage === null || newMessage.trim() === String.empty) {
            console.log(this._message);
        } else {
            console.log(newMessage);
        }
    }
}
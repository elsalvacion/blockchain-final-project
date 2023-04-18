// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Authentication {
    struct Device {
        uint256 passwordHash;
        uint256 bubbleId;
    }

    struct Message {
        int256 senderId;
        int256 receiverId;
        uint256 senderBubbleId;
        uint256 receiverBubbleId;
        string message;
    }

    mapping (int256 => mapping (int256 => Device)) private devices;
    mapping (int256 => mapping (int256 => Message[])) private messages;

    function register(int256 deviceId, uint256 password, uint256 bubbleId) external payable {
        require(devices[int256(bubbleId)][int256(deviceId)].passwordHash == 0, "Device already registered");
        uint256 passwordHash = uint256(keccak256(abi.encodePacked(password)));
        devices[int256(bubbleId)][int256(deviceId)] = Device(passwordHash, bubbleId);
    }

    function login(int256 deviceId, uint256 password, int256 bubbleId) external view returns (bool) {
        require(deviceId >= 0, "Device ID cannot be negative");
        require(password != 0, "Password cannot be empty");
        require(bubbleId >= 0, "Bubble ID cannot be negative");

        if (devices[bubbleId][deviceId].passwordHash == 0) {
            revert("Device not registered");
        }

        uint256 passwordHash = uint256(keccak256(abi.encodePacked(password)));
        if (devices[bubbleId][deviceId].passwordHash != passwordHash) {
            revert("Incorrect password");
        }

        return true;
    }

    function sendMessage(int256 senderId, int256 receiverId, uint256 senderBubbleId, uint256 receiverBubbleId, string memory message) external {
        require(devices[int256(senderBubbleId)][int256(senderId)].passwordHash != 0, "Sender not registered");
        require(devices[int256(receiverBubbleId)][int256(receiverId)].passwordHash != 0, "Receiver not registered");
        messages[int256(senderBubbleId)][int256(senderId)].push(Message(senderId, receiverId, senderBubbleId, receiverBubbleId, message));
        messages[int256(receiverBubbleId)][int256(receiverId)].push(Message(senderId, receiverId, senderBubbleId, receiverBubbleId, message));
    }

    function getMessages(int256 deviceId, uint256 bubbleId) external view returns (Message[] memory) {
        require(devices[int256(bubbleId)][deviceId].passwordHash != 0, "Device not registered");
        return messages[int256(bubbleId)][deviceId];
    }
    
    function getMessagesSentTo(int256 deviceId) external view returns (Message[] memory) {
        uint256 messageCount = 0;
        for (int256 i = 0; i < 100; i++) {
            messageCount += messages[i][deviceId].length;
        }
        Message[] memory result = new Message[](messageCount);
        uint256 index = 0;
        for (int256 j = 0; j < 100; j++) {
            Message[] memory msgs = messages[j][deviceId];
            for (uint256 k = 0; k < msgs.length; k++) {
                if (msgs[k].receiverId == deviceId) {
                    result[index] = msgs[k];
                    index++;
                }
            }
        }
        return result;
    }
}

import { useEffect, useRef, useState } from 'react';
import './ChatBox_page.css';
// import { UserProfile } from './chatbox/User_Profile'; // Uncomment if used
import dayjs from 'dayjs';

export function ChatBox() {

    const userList = [
        {
            name: 'Blue-user',
            address: '@blue-user',
            color: '#a3f4ff'
        },
        {
            name: 'Yellow-user',
            address: '@yellow-user',
            color: '#fff4a3'
        },
        {
            name: 'Green-user',
            address: '@green-user',
            color: '#a3ffb8'
        },
        {
            name: 'Red-user',
            address: '@red-user',
            color: '#ff9999'
        },
        {
            name: 'Purple-user',
            address: '@purple-user',
            color: '#d9a3ff'
        },
        {
            name: 'Orange-user',
            address: '@orange-user',
            color: '#ffb380'
        },
        {
            name: 'Pink-user',
            address: '@pink-user',
            color: '#ffb3d9'
        }
    ];

    const chatList = [
        { name: 'Robot', logo: 'fa-solid fa-robot' },
        { name: 'Computer', logo: 'fa-solid fa-computer' },
        { name: 'Food', logo: 'fa-solid fa-burger' },
        { name: 'Social', logo: 'fa-solid fa-people-group' },
        { name: 'Project', logo: 'fa-solid fa-rocket' }
    ];

    const messageEndRef = useRef<HTMLDivElement>(null);
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [activeUser, setActiveUser] = useState(userList[0]);
    const [userInputChat, setUserInputChat] = useState('');

    // --- State for typing indicator ---
    const [isTyping, setIsTyping] = useState(false);

    const [chatMessageName, setChatMessageName] = useState('Robot');
    const [allMessages, setAllMessages] = useState<{ [key: string]: any[] }>({
        Robot: [],
        Computer: [],
        Food: [],
        Social: [],
        Project: []
    });

    // Handle input field changes & typing timeout
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setUserInputChat(val);

        if (val.trim() !== '') {
            setIsTyping(true);

            // Reset the timeout timer whenever user types
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }

            // Stop typing indicator 1.5 seconds after user stops typing
            typingTimeoutRef.current = setTimeout(() => {
                setIsTyping(false);
            }, 2000);
        } else {
            setIsTyping(false);
        }
    };

    const handleSendMessage = () => {
        if (userInputChat.trim() !== '') {
            const newMessage = {
                text: userInputChat,
                sender: activeUser,
                time: dayjs().valueOf()
            };

            setAllMessages(prev => ({
                ...prev,
                [chatMessageName]: [...prev[chatMessageName], newMessage]
            }));
            setUserInputChat('');
            setIsTyping(false); // Reset typing indicator when message is sent

            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        }
    };

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Auto-scroll on new messages or when typing indicator appears/disappears
    useEffect(() => {
        scrollToBottom();
    }, [allMessages, chatMessageName, isTyping]);

    const formatTimeMessage = (msgTime: number) => {
        const date = dayjs(msgTime);
        const now = dayjs();

        if (date.isSame(now, 'day')) {
            return date.format('h:mm A');
        } else if (date.isSame(now.subtract(1, 'day'), 'day')) {
            return `Yesterday, ${date.format('h:mm A')}`;
        } else {
            return date.format('D MMMM YYYY, h:mm A');
        }
    };

    const formatTimeListMessage = (msgTime: number) => {
        const date = dayjs(msgTime);
        const now = dayjs();

        if (date.isSame(now, 'day')) {
            return date.format('h:mm A');
        } else if (date.isSame(now.subtract(1, 'day'), 'day')) {
            return `Yesterday`;
        } else {
            return date.format('D MMM YYYY');
        }
    };

    const currentChat = chatList.find(chat => chat.name === chatMessageName);

    const lastChat = (chatName: string) => {
        const messageChat = allMessages[chatName];
        if (!messageChat || messageChat.length === 0) {
            return null;
        }
        return messageChat[messageChat.length - 1];
    };

    return (
        <div className='chat-box-container'>
            <div className='chat-box-list'>
                <div className='chat-logo'><i className="fa-solid fa-comments"></i> Chats</div>
                <div className='chat-list'>
                    {chatList.map((chat, index) => {
                        const lastMsg = lastChat(chat.name);

                        return (
                            <div key={index} onClick={() => setChatMessageName(chat.name)} className='chat-holder'>
                                <div className='chat-image'>
                                    <i className={chat.logo}></i>
                                </div>
                                <div className='chat-details'>
                                    <h1>{chat.name}</h1>
                                    {lastMsg ? (
                                        <div className='chat-last-msg'>
                                            <p className='chat-msg-last'><span>{lastMsg.sender.name}</span>: {lastMsg.text}</p>
                                            <p className='chat-time-update'>{formatTimeListMessage(lastMsg.time)}</p>
                                        </div>
                                    ) : (
                                        <div className='chat-last-msg'>
                                            <p className='chat-msg-last'>No messages yet</p>
                                            <p className='chat-time-update'></p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className='chat-box'>
                <div className='chat-profile'>
                    <i className={currentChat?.logo || "fa-solid fa-comments"}></i>
                    <p>{chatMessageName}</p>
                </div>
                <div className='chat-message'>
                    {/* 1. All existing messages */}
                    {allMessages[chatMessageName]?.map((message: any, index: number) => (
                        <div className={`chat-${message.sender.name === activeUser.name ? 'active' : 'not-active'}`} key={index}>
                            <div className='user-profile'>
                                <p>{message.sender.name}</p>
                                <i style={{ color: `${message.sender.color}` }} className="fa-solid fa-user"></i>
                            </div>
                            <div className='msg-content'>
                                <p className='msg-text'>{message.text}</p>
                                <p className='msg-time'>{formatTimeMessage(message.time)}</p>
                            </div>
                        </div>
                    ))}

                    {/* 2. Typing Bubble added as a NEW ROW at the bottom */}
                    {isTyping && (
                        <div className="chat-active">
                            <div className="user-profile">
                                <p>{activeUser.name}</p>
                                <i style={{ color: activeUser.color }} className="fa-solid fa-user"></i>
                            </div>
                            <div className="msg-content">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. Ref to handle auto-scrolling upward */}
                    <div ref={messageEndRef} />
                </div>

                <div className='chat-input'>
                    <div className='chat-input-clear'>
                        <input
                            value={userInputChat}
                            onChange={handleInputChange}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder='Enter Message'
                            type='text'
                        />
                        <button onClick={() => { setUserInputChat(''); setIsTyping(false); }}>
                            <i className="fa-solid fa-x"></i>
                        </button>
                    </div>
                    <button onClick={handleSendMessage} className='send-msg'>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>

            <div className='chat-user-list'>
                <div className='user-profile'>
                    <div className='user-position'>
                        <i className="fa-solid fa-user"></i>
                        <p className='user-title'>Admin</p>
                    </div>
                    <i style={{ backgroundColor: `${activeUser.color}` }} className="fa-solid fa-user"></i>
                    <p className='user-name'>{activeUser.name}</p>
                    <p className='user-address'>{activeUser.address}</p>
                </div>

                <div className='user-list'>
                    {userList.map((user, index) => (
                        <div onClick={() => setActiveUser(userList[index])} className='user-list-holder' key={index}>
                            <i style={{ color: `${user.color}` }} className="fa-solid fa-user"></i>
                            <div className='user-list-details'>
                                <p className='user-name'>{user.name}</p>
                                <p className='user-address'>{user.address}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
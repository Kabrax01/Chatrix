interface User {
    name: string;
    img: string;
    messages: string[];
}

const usersData: User[] = [
    {
        name: "Alice Malone",
        img: "/user_list-1.webp",
        messages: [
            "Hello!",
            "How are you?",
            "What's up?",
            "Have a great day!",
            "See you later!",
        ],
    },
    {
        name: "Bob Odenkirk",
        img: "/user_list-2.webp",
        messages: [
            "Hi there!",
            "Good morning!",
            "How's it going?",
            "Take care!",
            "Goodbye!",
        ],
    },
    {
        name: "Charlie Brown",
        img: "/user_list-3.webp",
        messages: [
            "Hey!",
            "Nice to meet you!",
            "What's new?",
            "Catch you later!",
            "Bye!",
        ],
    },
    {
        name: "David Guetta",
        img: "/user_list-4.webp",
        messages: [
            "Greetings!",
            "Hope you're well!",
            "Long time no see!",
            "Talk soon!",
            "See you!",
        ],
    },
    {
        name: "Eve Stevens",
        img: "/user_list-5.webp",
        messages: [
            "Hi!",
            "How have you been?",
            "Anything new?",
            "Stay safe!",
            "Later!",
        ],
    },
    {
        name: "Frank Sinatra",
        img: "/user_list-6.webp",
        messages: [
            "Howdy!",
            "What's happening?",
            "All good?",
            "Keep in touch!",
            "Farewell!",
        ],
    },
];

export default usersData;

import {PostResponseType} from "../src/features/post/types/post-response-type";
import {CommentResponseType} from "../src/features/comment/types/comment-response-type";
import {UserResponseType} from "../src/features/user/types/user-response-type";

export const mockUsers: UserResponseType[] = [
    {
        "id": '65006408082dbe6d9f6206f1',
        "login": "Einstein",
        "email": "nodice@mail.com",
        "createdAt": "2024-09-08T18:24:21.794Z"
    },
    {
        "id": '66e28d91c4f3b7f1204e222a',
        "login": "Bohr",
        "email": "newphysics@test.com",
        "createdAt": "2024-09-08T18:25:44.946Z"
    },
    {
        "id": "66e29124c4f3b7f1204e222c",
        "login": "Kurchatov",
        "email": "nuclearadmin@kremlin.ru",
        "createdAt": "2024-09-10T05:04:20.902Z"
    },

    {
        "id": "6500d10082dbe6d9f6207001",
        "login": "Einstein",
        "email": "einstein@physics.com",
        "createdAt": "2023-08-10T14:15:30.000Z"
    },
    {
        "id": "6500d10182dbe6d9f6207002",
        "login": "Newton",
        "email": "newton@physics.com",
        "createdAt": "2024-03-05T10:11:25.000Z"
    },
    {
        "id": "6500d10282dbe6d9f6207003",
        "login": "Curie",
        "email": "curie@radiation.com",
        "createdAt": "2024-01-20T08:05:45.000Z"
    },
    {
        "id": "6500d10382dbe6d9f6207004",
        "login": "Oppenheimer",
        "email": "bohr@atom.com",
        "createdAt": "2023-11-18T16:25:00.000Z"
    },
    {
        "id": "6500d10482dbe6d9f6207005",
        "login": "Schrodinger",
        "email": "schrodinger@quantum.com",
        "createdAt": "2024-04-15T09:30:10.000Z"
    },
    {
        "id": "6500d10582dbe6d9f6207006",
        "login": "Feynman",
        "email": "feynman@particles.com",
        "createdAt": "2023-12-05T11:45:50.000Z"
    },
    {
        "id": "6500d10682dbe6d9f6207007",
        "login": "Hawking",
        "email": "hawking@cosmos.com",
        "createdAt": "2024-06-25T14:00:30.000Z"
    },
    {
        "id": "6500d10782dbe6d9f6207008",
        "login": "Heisenberg",
        "email": "heisenberg@uncertainty.com",
        "createdAt": "2024-02-12T19:55:40.000Z"
    },
    {
        "id": "6500d10882dbe6d9f6207009",
        "login": "Dirac",
        "email": "dirac@quantumfield.com",
        "createdAt": "2024-05-01T07:35:15.000Z"
    },
    {
        "id": "6500d10982dbe6d9f620700a",
        "login": "Galileo",
        "email": "galileo@astronomy.com",
        "createdAt": "2024-07-30T22:50:55.000Z"
    }


]

export const mockPosts :PostResponseType[] = [
    {
        "id": "1",
        "title": "The Future of AI",
        "shortDescription": "Exploring upcoming trends in artificial intelligence.",
        "content": "Article",
        "blogId": "3",
        "blogName": "TechBuzz",
        "createdAt": "2024-01-15T10:20:00.000Z"
    },
    {
        "id": "2",
        "title": "Budget-Friendly Travel",
        "shortDescription": "How to travel without breaking the bank.",
        "content": "Hint",
        "blogId": "2",
        "blogName": "Travel Tales",
        "createdAt": "2023-12-05T08:35:00.000Z"
    }
]

export const mockComments: CommentResponseType[] = [
    {
        "id": "1",
        "postId": "1",
        "content": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti",
        "commentatorInfo": {
            "userId": "66e28d91c4f3b7f1204e222a",
            "userLogin": "Bohr"
        },
        "createdAt": "2024-09-10T10:49:14.885Z"
    },
    {
        "id": "2",
        "postId": "2",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
        "commentatorInfo": {
            "userId": "3",
            "userLogin": "Tesla"
        },
        "createdAt": "2022-03-15T09:23:41.123Z"
    },
    {
        "id": "3",
        "postId": "1",
        "content": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "commentatorInfo": {
            "userId": "2",
            "userLogin": "Bohr"
        },
        "createdAt": "2021-07-30T13:02:58.456Z"
    },
    {
        "id": "4",
        "postId": "2",
        "content": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit.",
        "commentatorInfo": {
            "userId": "5",
            "userLogin": "Einstein"
        },
        "createdAt": "2023-01-21T16:47:22.789Z"
    },
    {
        "id": "5",
        "postId": "1",
        "content": "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
        "commentatorInfo": {
            "userId": "6",
            "userLogin": "Newton"
        },
        "createdAt": "2020-11-14T19:32:09.321Z"
    },
    {
        "id": "6",
        "postId": "2",
        "content": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
        "commentatorInfo": {
            "userId": "7",
            "userLogin": "Galileo"
        },
        "createdAt": "2020-05-10T12:12:54.654Z"
    },
    {
        "id": "7",
        "postId": "1",
        "content": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.",
        "commentatorInfo": {
            "userId": "8",
            "userLogin": "Feynman"
        },
        "createdAt": "2021-09-02T17:18:37.987Z"
    },
    {
        "id": "8",
        "postId": "2",
        "content": "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        "commentatorInfo": {
            "userId": "9",
            "userLogin": "Faraday"
        },
        "createdAt": "2023-07-08T10:03:12.234Z"
    },
    {
        "id": "9",
        "postId": "1",
        "content": "Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        "commentatorInfo": {
            "userId": "10",
            "userLogin": "Planck"
        },
        "createdAt": "2020-08-25T22:45:39.876Z"
    },
    {
        "id": "10",
        "postId": "2",
        "content": "Et harum quidem rerum facilis est et expedita distinctio.",
        "commentatorInfo": {
            "userId": "11",
            "userLogin": "Kepler"
        },
        "createdAt": "2021-12-17T08:55:01.567Z"
    },
    {
        "id": "11",
        "postId": "1",
        "content": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.",
        "commentatorInfo": {
            "userId": "3",
            "userLogin": "Tesla"
        },
        "createdAt": "2022-04-28T09:49:23.891Z"
    },
    {
        "id": "12",
        "postId": "2",
        "content": "Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.",
        "commentatorInfo": {
            "userId": "2",
            "userLogin": "Bohr"
        },
        "createdAt": "2020-06-11T14:23:41.341Z"
    },
    {
        "id": "13",
        "postId": "1",
        "content": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
        "commentatorInfo": {
            "userId": "6",
            "userLogin": "Newton"
        },
        "createdAt": "2021-10-10T19:33:25.112Z"
    },
    {
        "id": "14",
        "postId": "2",
        "content": "Nisi ut aliquid ex ea commodi consequatur?",
        "commentatorInfo": {
            "userId": "5",
            "userLogin": "Einstein"
        },
        "createdAt": "2023-05-05T16:24:12.434Z"
    },
    {
        "id": "15",
        "postId": "1",
        "content": "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
        "commentatorInfo": {
            "userId": "4",
            "userLogin": "Curie"
        },
        "createdAt": "2022-07-19T11:12:41.999Z"
    },
    {
        "id": "16",
        "postId": "2",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        "commentatorInfo": {
            "userId": "7",
            "userLogin": "Galileo"
        },
        "createdAt": "2020-09-21T09:15:47.298Z"
    },
    {
        "id": "17",
        "postId": "1",
        "content": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "commentatorInfo": {
            "userId": "3",
            "userLogin": "Tesla"
        },
        "createdAt": "2021-12-25T08:44:02.871Z"
    },
    {
        "id": "18",
        "postId": "2",
        "content": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.",
        "commentatorInfo": {
            "userId": "8",
            "userLogin": "Feynman"
        },
        "createdAt": "2022-03-14T21:35:29.501Z"
    },
    {
        "id": "19",
        "postId": "1",
        "content": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        "commentatorInfo": {
            "userId": "9",
            "userLogin": "Faraday"
        },
        "createdAt": "2023-02-17T10:47:55.194Z"
    },
    {
        "id": "20",
        "postId": "2",
        "content": "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        "commentatorInfo": {
            "userId": "10",
            "userLogin": "Planck"
        },
        "createdAt": "2020-07-30T18:12:09.376Z"
    },
    {
        "id": "21",
        "postId": "1",
        "content": "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        "commentatorInfo": {
            "userId": "11",
            "userLogin": "Kepler"
        },
        "createdAt": "2021-05-20T14:27:31.654Z"
    }
]

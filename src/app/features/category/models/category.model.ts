import { BlogPost } from "../../blog-post/models/blogpost.model";

export interface Category {
    id: number;
    name: string;
    urlHandle: string;
    blogPosts?: BlogPost[]; // Optional array of BlogPost
}

import Post from '../../models/Post';
import {Client} from "pg";
import {getClient} from "../../dbconnect";
import {PostDataAccess} from "../PostDataAccess";


export class PostDataAccessSQL implements PostDataAccess {

    private client: Client;

    constructor() {
        this.client = getClient()
    }

    async addPost(post: Post): Promise<void> {
        const query = 'INSERT INTO post (post_title, posted_by, publish_date, post_blurb, post_category, img_address)' +
            ' VALUES ($1, $2, $3, $4, $5, $6)';
        await this.client.query(query, [post.post_title, post.posted_by, post.publish_date, post.post_blurb,
            post.post_category, post.img_address]);
    }

    async getPostById(postId: number): Promise<Post> {
        const query = 'SELECT * FROM post WHERE post_id = $1';
        const result = await this.client.query(query, [postId]);

        if (result.rows.length === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }

        return result.rows[0];
    }

    async getAllPosts(category: string = 'all', contentFilter: string = '%', userFilter:string = '', limit: number = 3, start: number = 0): Promise<Array<Post>> {
        let category_by: string = category !== 'all' ? category : '%';
        let contentFilter_by: string = contentFilter ? `%${contentFilter}%`: '%';
        let userFilter_by: string = userFilter ? `%${userFilter}`: '%';
        let limit_by: number = limit ? limit: 3;
        let start_by: number = start ? start: 0;

        let queryText = `
        (
            SELECT * FROM post 
            WHERE post_category = 'Articles' 
            AND (post_title LIKE $1)
            AND (posted_by LIKE $2)
            LIMIT $3
        )
        UNION ALL
        (
            SELECT * FROM post 
            WHERE post_category = 'Tutorials' 
            AND (post_title LIKE $1)
            AND (posted_by LIKE $2)
            LIMIT $3
        )
        UNION ALL
        (
            SELECT * FROM post 
            WHERE post_category = 'Rants' 
            AND (post_title LIKE $1) 
            AND (posted_by LIKE $2)
            LIMIT $3
        );
    `;

        if (category !== 'all') {
            queryText = `
            SELECT * FROM post 
            WHERE (post_category LIKE $4) 
            AND (post_title LIKE $1) 
            AND (posted_by LIKE $2)
            LIMIT $3 OFFSET $5
        `;
        }

        const query = category !== 'all'
            ? {
                text: queryText,
                values: [contentFilter_by, userFilter_by, limit_by, category_by, start_by]
            }
            : {
                text: queryText,
                values: [contentFilter_by, userFilter_by, limit_by]
            };

        const allPosts = await this.client.query(query);

        if (allPosts.rowCount === 0) {
            throw new Error('No posts found');
        }

        return allPosts.rows;
    }

    async getPostCount(category: string = 'all'): Promise<number> {
        let category_by: string = category !== 'all' ? category : '%';
        let queryText = `
        SELECT COUNT(*) FROM post 
        WHERE post_category LIKE $1;
    `;

        const query = {
            text: queryText,
            values: [category_by]
        };

        const countResult = await this.client.query(query);

        return countResult.rows[0].count
    }

    async updatePost(postId: number, updateData: Partial<Post>): Promise<void> {
        let query = 'UPDATE post ' + 'SET ';
        const updates: string[] = [];
        const values: (string | number)[] = [];

        Object.entries(updateData).forEach(([key, value], index) => {
            updates.push(`${key} = $${index + 1}`);
            values.push(value);
        });

        query += updates.join(', ') + ' WHERE post_id = $' + (values.length + 1);
        values.push(postId);

        const result = await this.client.query(query, values);
        if (result.rowCount === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }
    }

    async deletePost(postId: number): Promise<void> {
        const query = 'DELETE FROM post WHERE post_id = $1';
        const result = await this.client.query(query, [postId]);
        if (result.rowCount === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }
    }
}

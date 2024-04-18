class Post {
    post_id: number;
    post_title: string;
    posted_by: string;
    publish_date: string;
    post_blurb: string;
    post_category: string;
    img_address: string;
    constructor(postId: number, postTitle: string, postedBy: string, publishDate: string, postBlurb: string, postCategory: string, imgAddress: string ) {
        this.post_id = postId;
        this.post_title = postTitle
        this.posted_by = postedBy
        this.publish_date = publishDate;
        this.post_blurb = postBlurb;
        this.post_category = postCategory;
        this.img_address = imgAddress;

    }
}
export default Post;
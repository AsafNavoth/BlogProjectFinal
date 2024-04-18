describe('API Tests', () => {
    let test_post_id: number = NaN;

    describe('POST /posts', () => {
        it('should create a new post and return a success message', async () => {
            const postData = {
                post_title: 'Test Title',
                posted_by: 'Test User',
                publish_date: '2023-12-31',
                post_blurb: 'Test blurb',
                post_category: 'Articles',
                img_address: 'Test Address',
            };

            const response = await fetch('http://localhost:3001/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            const data = await response.json();

            expect(response.status).toBe(201);
            expect(data).toHaveProperty('message', 'Post created successfully');
        });
    });

    describe('GET /posts', () => {
        it('should get all posts and return their details', async () => {
            const response = await fetch('http://localhost:3001/posts');
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(Array.isArray(data)).toBe(true);
            if (data.length > 0) {
                expect(data[0]).toHaveProperty('post_title');
                expect(data[0]).toHaveProperty('posted_by');
                expect(data[0]).toHaveProperty('publish_date');
                expect(data[0]).toHaveProperty('post_blurb');
                expect(data[0]).toHaveProperty('post_category');
                expect(data[0]).toHaveProperty('img_address');

                test_post_id = data[0].post_id
            }
        });
    });

    describe('GET /posts/:id', () => {
        it('should get a post and return its details', async () => {
            const response = await fetch(`http://localhost:3001/posts/${test_post_id}`);

            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.post_title).toBe('Test Title');
            expect(data.posted_by).toBe('Test User');
            expect(data.publish_date).toBe('2023-12-31');
            expect(data.post_blurb).toBe('Test blurb');
            expect(data.post_category).toBe('Articles');
            expect(data.img_address).toBe('Test Address');
        });
    });

    describe('POST /posts/:id', () => {
        it('should update a post and return a success message', async () => {
            const updateData = {
                post_title: 'Updated Title',
                posted_by: 'Updated User',
                publish_date: '2023-12-31',
                post_blurb: 'Updated Blurb',
                post_category: 'Rants',
                img_address: 'Updated Test Address',
            };

            const response = await fetch(`http://localhost:3001/posts/${test_post_id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updateData)
            });

            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data).toHaveProperty('message', `Post ${test_post_id} updated successfully`);

            const response2 = await fetch(`http://localhost:3001/posts/${test_post_id}`);

            const data2 = await response2.json();

            expect(response.status).toBe(200);
            expect(data2.post_title).toBe('Updated Title');
            expect(data2.posted_by).toBe('Updated User');
            expect(data2.publish_date).toBe('2023-12-31');
            expect(data2.post_blurb).toBe('Updated Blurb');
            expect(data2.post_category).toBe('Rants');
            expect(data2.img_address).toBe('Updated Test Address');
        });
    });

    describe('DELETE /posts/:id', () => {
        it('should delete a post and return a success message', async () => {
            const response = await fetch(`http://localhost:3001/posts/${test_post_id}`, { method: 'DELETE' });

            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data).toHaveProperty('message', `Post ${test_post_id} deleted successfully`);

            const response2 = await fetch('http://localhost:3001/posts');

            const data2 = await response2.text();
            expect(response2.status).toBe(400)
            expect(data2).toBe("No posts found")
        });
    });
})



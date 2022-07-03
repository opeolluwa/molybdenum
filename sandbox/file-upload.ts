const app: any = {} //express instance
import formidable from "formidable"

app.get('/api/upload', (req, res) => {
    res.send(`
      <h2>With <code>"express"</code> npm package</h2>
      <form action="/api/upload" enctype="multipart/form-data" method="post">
        <div>Text field title: <input type="text" name="title" /></div>
        <div>File: <input type="file" name="someExpressFiles" /></div>
        <input type="submit" value="Upload" />
      </form>
    `);
});

app.post('/api/upload', (req, res, next) => {
    const options = {
        uploadDir: './uploads',
        keepExtensions: true,
        maxFileSize: 100 * 1024 * 1024, //100MB
        fileName: "filename" + Date.now()
    }
    const form = formidable({ ...options });

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ fields, files });
    });
});

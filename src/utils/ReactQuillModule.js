export const Modules = {
    toolbar: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        [
            {
                color: ["red", "blue", "yellow", "black", "white", "green", "purple", "cyan", "DarkGray"],
            },
            {
                background: ["red", "blue", "yellow", "black", "white", "green", "purple", "cyan", "DarkGray"]
            }
        ],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ color: ['red', 'black'] }, { background: [] }]
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        ['link', 'image', 'video'],

        ["clean"]
    ]
};

// const comments = JSON.parse(localStorage.getItem('ao3_quoted_comments')) || [];
const comments = JSON.parse(localStorage.getItem('ao3_quoted_comments')) || {};
let idx = 0;

document.querySelectorAll("#workskin div.userstuff p").forEach((paragraph) => {
    // Create the icon element
    let icon = document.createElement("span");
    icon.id = `quoted-comment-${String(idx++).padStart(6, '0')}`;
    icon.classList.add('insert-quoted-comment-icon')
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="15" height="15" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>`;
    icon.style.cursor = "pointer";
    icon.style.marginLeft = "10px";
    icon.title = "Click me!";
    icon.style.display = "inline-flex";
    icon.style.alignItems = "center";
    icon.style.justifyContent = "center";
    icon.style.width = "20px";
    icon.style.height = "20px";
    icon.style.borderRadius = "50%";
    icon.style.borderWidth = "0";
    icon.style.transition = "background 0.2s";
    if (icon.id in comments) {
        icon.classList.add('comment-filled');
        icon.style.color = 'white';
        icon.style.background = 'rgba(0,0,0,0.50)';
        icon.onmouseenter = null;
        icon.onmouseleave = null;
    } else {
        icon.style.color = "gray"; // Customize appearance
        icon.onmouseenter = () => { icon.style.background = "#f0f0f0"; };
        icon.onmouseleave = () => { icon.style.background = ""; };
    }

    // Click event (You can modify this to do something specific)
    icon.onclick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (event.target.tagName && event.target.tagName.toLowerCase() !== 'svg') {
            return
        }
        if (event.target.parentNode.classList.contains('comment-filled')) {
            // wrapper.style.display = 'none';
            const commentWrapperDiv = event.target.parentNode.parentNode.nextSibling;
            if (commentWrapperDiv && commentWrapperDiv.style) {
                if (commentWrapperDiv.style.display === 'none') {
                    commentWrapperDiv.style.display = '';
                } else {
                    commentWrapperDiv.style.display = 'none';
                }
            }
            return

        }

        const commentWrapperDiv = event.target.parentNode.parentNode.nextSibling;
        if (commentWrapperDiv.id === 'floating-input-wrapper') {
            commentWrapperDiv.remove()
            return
        }

        // Create wrapper div
        const wrapper = document.createElement('div');
        wrapper.id = 'floating-input-wrapper';
        wrapper.style.marginTop = '8px';
        wrapper.style.padding = '12px 20px';
        wrapper.style.backgroundColor = 'rgb(221, 221, 221)'

        // Create input
        const textarea = document.createElement('textarea');
        textarea.id = 'floating-input';
        textarea.style.marginBottom = '8px';
        textarea.style.minHeight = '1rem';

        // Create submit button
        const p = document.createElement('p');
        const saveBtn = document.createElement('button');
        p.style.textAlign = 'right';
        p.style.margin = '0px';
        saveBtn.type = 'button';
        saveBtn.textContent = 'Save';
        saveBtn.onclick = () => {
            wrapper.style.display = 'none';

            event.target.parentNode.classList.add('comment-filled');
            const commentTextarea = event.target.parentNode.parentNode.nextSibling.firstChild
            const paragraph = event.target.parentNode.parentNode
            const clonedParagraph = paragraph.cloneNode(true);
            if (clonedParagraph.lastElementChild && clonedParagraph.lastElementChild.tagName === 'SPAN') {
                clonedParagraph.removeChild(clonedParagraph.lastElementChild);
            }
            const paragraphText = clonedParagraph.innerHTML;
            if (commentTextarea && commentTextarea.value.trim() !== '') {
                const commentText = commentTextarea.value.trim();
                comments[icon.id] = { paragraph: paragraphText, comment: commentText }
                localStorage.setItem('ao3_quoted_comments', JSON.stringify(comments));
                event.target.parentNode.style.background = 'rgba(0,0,0,0.50)';
                event.target.parentNode.style.color = 'white';
                event.target.parentNode.onmouseenter = null;
                event.target.parentNode.onmouseleave = null;
            }
        }


        // Append input and button to wrapper
        p.appendChild(saveBtn);
        wrapper.appendChild(textarea);
        wrapper.appendChild(p);

        // Insert wrapper after paragraph
        paragraph.parentNode.insertBefore(wrapper, paragraph.nextSibling);

        textarea.focus();
    }

    // Append the icon next to the paragraph
    paragraph.appendChild(icon);
});

const pComment = document.querySelector("#add_comment fieldset p.submit")
const writeBtn = document.createElement('button');
writeBtn.type = 'button';
writeBtn.textContent = 'Insert and clear saved comments';

writeBtn.onclick = () => {
    const quotedCommentText = Object.keys(comments)
        .sort()
        .map(key => {
            const item = comments[key];
            return `<blockquote>${item.paragraph}</blockquote>\n${item.comment}`;
        })
        .join('\n');
    document.querySelectorAll('.insert-quoted-comment-icon').forEach(icon => {
        icon.style.background = '';
        icon.style.color = 'gray';
        icon.classList.remove('comment-filled');
        icon.onmouseenter = () => { icon.style.background = "#f0f0f0"; };
        icon.onmouseleave = () => { icon.style.background = ""; };
    });
    const commentArea = document.querySelector("#add_comment fieldset textarea")
    if (commentArea) {
        const footer = ""
        commentArea.value += (commentArea.value ? '\n\n' : '') + quotedCommentText + footer;
        commentArea.focus();
        for (const key in comments) {
            if (Object.hasOwn(comments, key)) {
                delete comments[key];
            }
        }
        localStorage.setItem('ao3_quoted_comments', JSON.stringify(comments));
    }
}

pComment.insertBefore(writeBtn, pComment.firstChild)


let comments_wrapper = document.querySelector('.comments_main_wrapper')
// let comment_box = document.querySelectorAll('.comment_box');
let comment = document.querySelectorAll('.comment');
let vote_count = document.querySelectorAll('.vote_count')
let avatar = document.querySelectorAll('.avatar')
let user = document.querySelectorAll('.user_name')
let time_posted = document.querySelectorAll('.time_posted')
let reply_btn = document.querySelectorAll('.reply_btn')
let add_new_comment = document.querySelector('.add_new_comment')

let add_comment_wrapper;
let comment_input = document.querySelectorAll('.comment_input')
let comment_form = document.querySelector('.comment_form')

const handle_send_btn = () => {
    const obj = my_array.currentUser
    const current_comment_ind = my_array.comments.length
    let comment_input = document.getElementById('comment_input')

    create_comments('1', obj.image.png, obj.username, 'just now', comment_input.value, current_comment_ind, false)

    comment_input.value = '';
}

const handleReplyBtn = (event) => {
            const parentAt = gotoParent('comment_box', event.target)
            parentAt.querySelector('.add_comment_wrapper').classList.add('active')
        }

const gotoParent = (parent_class, childElement) => {
    let result = childElement
    
    while(result){

        if(result.classList && result.classList.contains(parent_class)){
            return result
        }
        result = result.parentNode
        
    }
    return null;
}

const handleDeleteBtn = (event) => {
    gotoParent('comment_box', event.target).style.display = 'none'
}

const handleEditBtn = (event) => {
    gotoParent('comment_box', event.target).querySelector('.comment').classList.add('active')
    
}

let handle_send_btn_click = (event) => {
            const button = event.target
            const replied_to = button.parentNode.querySelector('.set_replying_to').value
            const main_comment_index = button.parentNode.querySelector('.main_comment_index').value
            const comment_input_h = button.parentNode.querySelector('.comment_input')
            let item = my_array.currentUser
            if(my_array.comments[main_comment_index] == undefined || my_array.comments[main_comment_index].replies.length == 0){
                let reply = document.createElement('div');
                reply.className = 'replies_box';
                
                create_comments('1', item.image.png, item.username, 'just now', comment_input_h.value, main_comment_index, true, true, reply, replied_to)
                comments_wrapper.children[main_comment_index].appendChild(reply)
            } else{
    
                let reply_box = gotoParent('replies_box', button)
                if(reply_box == null){
                    reply_box = gotoParent('comment_box', button).querySelector('.replies_box')
                }
                // let reply_box = button.parentNode.parentNode.parentNode                
                
                create_comments('1', item.image.png, item.username, 'just now', comment_input_h.value, main_comment_index, true, true, reply_box, replied_to)
                    
            }  
            
            new_reply_btn = comments_wrapper.children[main_comment_index].lastChild.lastChild.querySelector('.reply_btn')
            
            if(new_reply_btn){
                new_reply_btn.addEventListener('click', () => {  
                    // send_btn = document.querySelectorAll('.send_btn') 
    
                    const btn_parent = gotoParent('comment_box', new_reply_btn)
                    btn_parent.querySelector('.add_comment_wrapper').classList.add('active') //toggle add_comment wrapper active state
                })

            }
    
            comment_input_h.value = '';
            let btn_parent = gotoParent('comment_box', button)
            btn_parent.querySelector('.add_comment_wrapper').classList.remove('active')
            // add_comment_wrapper[index].classList.remove('active')

        }

create_comments = (vote, ava_url, user_name, time, comment, ind, isReply, isSendBtnClicked, reply, replying_to) => {
    const new_comment = document.createElement('div');
    if(isReply){
        comment = `<span class="replying_to">@${replying_to}</span> ${comment}`
    }
    new_comment.className = 'comment_box'
    new_comment.innerHTML = `
                                <div class="main_comment">
                                    <div class="votes">
                                        <div class="plus_icon"><svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg></div>
                                        <div class="vote_count">${vote}</div>
                                        <div class="minus_icon"><svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg></div>
                                    </div>
                                    <div class="comment_txt">
                                        <div class="top_third">
                                        <div class="top_left">
                                            <div class="avatar_wrapper"><img src="${ava_url}" alt="" class="avatar"></div>
                                            <div class="user_name">${user_name}</div>
                                            <div class="time_posted">${time}</div>
                                        </div>
                                        <div class="top_right">
                                            <button class="reply_btn" onclick="handleReplyBtn(event)"><svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg><span>Reply</span></button>
                                        </div>
                                        </div>
                                        <div class="comment">${comment}</div>
                                    </div>
                                </div>
                                <div class="add_comment_wrapper">
                                    <div class="current_user_avatar"><img src="${my_array.currentUser.image.png}"></div>
                                    <input type="hidden" value="${user_name}" class="set_replying_to">
                                    <input type="hidden" value="${ind}" class="main_comment_index">
                                    <textarea name="reply_txt" class="comment_input" rows="5" placeholder="Add a reply"></textarea>
                                    <button class="send_btn" onclick="handle_send_btn_click(event)">REPLY</button>
                                </div>

    `
    if(isReply){
        if(isSendBtnClicked){
            new_comment.querySelector('.user_name').innerHTML = `                                                            
                                                                ${user_name} <span class="you">you</span>
                                                            `
            new_comment.querySelector('.top_right').innerHTML = `
                                                                    <button class="delete_btn" onclick="handleDeleteBtn(event)"><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg><span>Delete</span></button>
                                                                    <button class="edit_btn" onclick="handleEditBtn(event)"><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg><span>Edit</span></button>
            `
            let temp_comm = new_comment.querySelector('.comment').innerText
            new_comment.querySelector('.comment').innerHTML = `
                                    <div class="raw_comment">${comment}</div>
                                    <textarea name="edit_comment" class="edit_comment" rows="5">${temp_comm}</textarea>
                                    <button class="update_btn">Update</button>
                            `
        }
        reply.appendChild(new_comment)
    } else {
        comments_wrapper.appendChild(new_comment)
    }
}

//

var new_reply_btn;

fetch('data.json')
    .then(response =>response.json())
    .then(data => {
        my_array = data
        console.log(data);

        for(let ind = 0; ind < my_array.comments.length; ind++){
            create_comments(my_array.comments[ind].score, my_array.comments[ind].user.image.png, my_array.comments[ind].user.username, my_array.comments[ind].createdAt, my_array.comments[ind].content, ind, false)
            
            if(my_array.comments[ind].replies.length > 0){
                let reply = document.createElement('div');
                reply.className = 'replies_box';
                for(let ind2 = 0; ind2 < my_array.comments[ind].replies.length; ind2++){
                    let item =  my_array.comments[ind].replies[ind2]
                    create_comments(item.score, item.user.image.png, item.user.username, item.createdAt, item.content,  ind, true, false, reply, item.replyingTo)
                    
                }
                // comments_wrapper.appendChild(reply)
                comments_wrapper.children[ind].appendChild(reply)
            }
        }

        add_new_comment.innerHTML = `
                                        <div class="post_comment">
                                            <div class="current_user_avatar"><img src="${my_array.currentUser.image.png}"></div>
                                            <textarea name="comment_input" id="comment_input" rows="5" placeholder="Add a comment"></textarea>
                                            <button class="send_btn_fr send_btn" onclick="handle_send_btn()">SEND</button>
                                        </div>
        `

        add_comment_wrapper = document.querySelectorAll('.add_comment_wrapper')
        reply_btn = document.querySelectorAll('.reply_btn')

        // reply_btn.forEach((button, index) => {
        //     button.addEventListener('click', () => {
        //         add_comment_wrapper[index].classList.add('active')
        //         gotoParent('comment_box', button)
        //         // button.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.add_comment_wrapper').classList.add('active')
        //     })
        // });

        // let add_send_btn_EL = (btn_array) => {
        //     btn_array.forEach((button, index) => {
        //         button.addEventListener('click', () => {

        //             const replied_to = button.parentNode.querySelector('.set_replying_to').value
        //             const main_comment_index = button.parentNode.querySelector('.main_comment_index').value
        //             let item = my_array.currentUser
        //             if(my_array.comments[main_comment_index].replies.length == 0){
        //                 let reply = document.createElement('div');
        //                 reply.className = 'replies_box';
                        
        //                 create_comments('1', item.image.png, item.username, 'just now', comment_input[index].value, main_comment_index, true, reply, replied_to)
        //                 comments_wrapper.children[index].appendChild(reply)
        //             } else{

        //                 let reply_box = button.parentNode.parentNode.parentNode
                        
        //                 create_comments('1', item.image.png, item.username, 'just now', comment_input[index].value, main_comment_index, true, reply_box, replied_to)
                            
        //             }  
                    
        //             new_reply_btn = comments_wrapper.children[main_comment_index].lastChild.lastChild.querySelector('.reply_btn')
        //             new_reply_btn.addEventListener('click', () => {  
        //                 // send_btn = document.querySelectorAll('.send_btn')                
        //                 new_reply_btn.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.add_comment_wrapper').classList.add('active') //toggle add_comment wrapper active state
        //             })

        //             comment_input[index].value = '';
        //             add_comment_wrapper[index].classList.remove('active')
                    
        //         })
        //     })
        // }
        
        // add_send_btn_EL(send_btn)
        
        
    })
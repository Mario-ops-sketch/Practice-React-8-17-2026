import { useRef, useState } from 'react';
import dayjs from 'dayjs'
import './Task_page.css'



export function TaskPage() {

    const colorUser = [{
        color: '#a3f4ff', name: 'Blue-User-123', address: '@blueuser123', description: `Blue Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
                                        molestiae nesciunt iusto repellat voluptas explicabo architecto asperiores
                                        at ducimus, illo consequatur quo impedit aliquid quisquam officia,
                                        dignissimos veritatis inventore ut?` },
    {
        color: '#ffb3b3', name: 'Pink-User-123', address: '@pinkuser123', description: `Pink Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
                                        molestiae nesciunt iusto repellat voluptas explicabo architecto asperiores
                                        at ducimus, illo consequatur quo impedit aliquid quisquam officia,
                                        dignissimos veritatis inventore ut?` },
    {
        color: '#eeff99', name: 'Yellow-User-123', address: '@yellowuser123', description: `Yellow Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
                                        molestiae nesciunt iusto repellat voluptas explicabo architecto asperiores
                                        at ducimus, illo consequatur quo impedit aliquid quisquam officia,
                                        dignissimos veritatis inventore ut?` },
    {
        color: '#c291fd', name: 'Purple-User-123', address: '@purpleuser123', description: `Purple Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
                                        molestiae nesciunt iusto repellat voluptas explicabo architecto asperiores
                                        at ducimus, illo consequatur quo impedit aliquid quisquam officia,
                                        dignissimos veritatis inventore ut?` },
    {
        color: '#ff9470', name: 'Red-User-123', address: '@reduser123', description: `Red Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
                                        molestiae nesciunt iusto repellat voluptas explicabo architecto asperiores
                                        at ducimus, illo consequatur quo impedit aliquid quisquam officia,
                                        dignissimos veritatis inventore ut?` }

    ];

    const defaultValue = {
        title: "Title",
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quisquam placeat suscipit, soluta voluptatem dolorem quos excepturi
            voluptatum optio itaque maxime autem, recusandae illo reiciendis nostrum
            perferendis nulla quae inventore sapiente?`,
        owner: {
            color: 'black',
            name: 'user',
            address: '@user'
        },
        time: '12:00 AM'
    }

    const [activeUser, setActiveUser] = useState<any>(null);
    const [titleInput, setTitleInput] = useState('');
    const [descripInput, setDescripInput] = useState('');
    const [postDisplay, setPostDisplay] = useState<any>(defaultValue);
    const [noteList, setNoteList] = useState<any>([]);
    const [showError, setShowError] = useState<{ show: boolean, message: string }>({
        show: false,
        message: ''
    });
    const [editNoteId, setEditNoteId] = useState<string | null>(null);


    const [showDelete, setShowDelete] = useState<{ show: boolean, message: string, id: string }>({
        show: false,
        message: '',
        id: ''
    });

    const titleRef = useRef<HTMLInputElement>(null);
    const descripRef = useRef<HTMLTextAreaElement>(null);

    const addTask = () => {
        if (!activeUser) {
            triggerAlert('Please select a user first!');
            return;
        }
        if ((descripInput.length === 0) && (titleInput.length === 0)) {
            triggerAlert('Please input a title and a description for this task!');
            return;
        }
        if (titleInput.length === 0) {
            triggerAlert('Please input a title for this task!');
            return;
        }
        if (descripInput.length === 0) {
            triggerAlert('Please input a description for this task!');
            return;
        }
        if (editNoteId) {
            const updatedList = noteList.map((note: any) => editNoteId === note.id ? {
                ...note,
                title: titleInput,
                description: descripInput,
                lastModified: dayjs().valueOf()
            } : note);
            setNoteList(updatedList);
            setEditNoteId(null);

            if(postDisplay && postDisplay.id === editNoteId) {
                const updatedPost = {
                    ...postDisplay,
                    title: titleInput,
                    description: descripInput,
                    lastModified: dayjs().valueOf()
                }
                setPostDisplay(updatedPost);
            }
        }
        else {
            const noteAdded = [
                ...noteList,
                {
                    title: titleInput,
                    description: descripInput,
                    owner: activeUser,
                    time: dayjs().valueOf(),
                    id: crypto.randomUUID(),
                    lastModified: dayjs().valueOf()
                }
            ];

            setNoteList(noteAdded);
        }

        setTitleInput('');
        setDescripInput('');
    }

    const triggerAlert = (msg: string) => {
        setShowError({ show: true, message: msg });
    }

    const displayPost = (task: any) => {
        setPostDisplay(task);
    }



    const noteCreate = () => {
        if (!activeUser) return 0;
        return noteList.filter((user: any) => user.owner.name === activeUser.name).length;

    }

    const deleteNote = (id: string) => {
        const updatedList = noteList.filter((t: any) => t.id !== id);
        setNoteList(updatedList);
        setShowDelete({ show: false, message: '', id: '' });
    }

    const deleteNoteConfirm = (id: string, title: string) => {
        setShowDelete({ show: true, message: `${title}`, id: id });
    }

    const editNote = (note: any) => {
        setTitleInput(note.title);
        setDescripInput(note.description);
        setEditNoteId(note.id);
        setActiveUser(note.owner);

        titleRef.current?.focus();
    }


    return (
        <>
            <div className='create-note-container'>
                <div className='create-note-holder'>

                    <div className='profile-note'>
                        <div className='profile-holder-details'>
                            <div className='profile-holder'>
                                <div className='profile-circle' style={{
                                    backgroundColor: `${activeUser ? activeUser.color : 'white'}`
                                }} >
                                    <i className="fa-solid fa-user"></i>
                                </div>
                            </div>

                            <div className='profile-details'>
                                <div className='user-name-details'>
                                    <p className='user-name'>{activeUser ? activeUser.name : "Select User"}</p>
                                    <p className='user-address'>{activeUser ? activeUser.address : "@user"}</p>
                                    <p className='user-descrip'>{activeUser ? activeUser.description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam placeat suscipit, soluta voluptatem dolorem quos excepturi voluptatum optio itaque maxime autem, recusandae illo reiciendis nostrum perferendis nulla quae inventore sapiente?"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='user-note-list'>
                            <div className='user-note-added'>
                                <p><i className="fa-solid fa-thumbtack"></i> Notes Added: <span>{noteCreate()}</span></p>
                            </div>

                            <div className='added-note-list'>
                                {noteList && noteList.filter((user: any) => user.owner.name === activeUser?.name).map((note: any, index: number) => (
                                    <div className='added-note'>
                                        <p className='note-title'>{note.title}</p>
                                        <p className='note-descrip'>{note.description}</p>
                                        <div className='edit-delete-button'>
                                            <button onClick={() => editNote(note)} className='edit-note'><i className="fa-solid fa-pen-to-square"></i></button>
                                            <button onClick={() => deleteNoteConfirm(note.id, note.title)} className='delete-note'><i className="fa-solid fa-trash-can"></i></button>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                    </div>

                    <div className='create-note'>
                        <div className='task-note'>
                            <div className='title-descrip'>
                                <div className='title-input'>
                                    <input ref={titleRef} value={titleInput} onChange={(e) => setTitleInput(e.target.value)} type='text' placeholder='Untitled'></input>
                                    <button onClick={() => { setTitleInput(''); titleRef.current?.focus() }}>✕</button>
                                </div>
                                <div className='descrip-input'>
                                    <textarea ref={descripRef} value={descripInput} onChange={(e) => setDescripInput(e.target.value)} placeholder='Enter Description' />
                                    <button onClick={() => { setDescripInput(''); descripRef.current?.focus() }}>✕</button>
                                </div>
                            </div>

                            <div className='add-clear-button'>
                                <button onClick={() => { setDescripInput(''); setTitleInput('') }} className='clear-button'>- <span>Clear</span></button>
                                <button onClick={addTask} className='add-button'>+ <span>{editNoteId ? 'Update' : 'Add'}</span></button>
                            </div>
                        </div>
                    </div>

                    <div className='user-bar-list'>
                        <div className='user-list'>
                            {colorUser.map((data, index) => (
                                <div onClick={() => setActiveUser(data)} className='user'>
                                    <div className='user-circle-status'>
                                        <div className='user-circle'>
                                            <i style={{
                                                color: `${data.color}`
                                            }} className="fa-solid fa-user"></i>
                                        </div>
                                        <div className='status-circle' style={{
                                            backgroundColor: `${activeUser?.name === data.name ? 'green' : 'grey'}`
                                        }}></div>
                                    </div>
                                    <div className='hover-info'>
                                        <div className='hover-user'>
                                            <i className="fa-solid fa-user"></i>
                                            <p>{data.name}</p>
                                        </div>
                                        <div className='hover-address'>{data.address}</div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>

            <div className='note-list'>
                <div className='note-list-container'>
                    <div className={`note-list-post ${postDisplay ? 'half-width' : 'full-width'}`}>
                        <div className='note-list-holder'>
                            {noteList && noteList.map((note: any, index: number) => (
                                <div onClick={() => displayPost(note)} key={index} className='list-container-post'
                                    style={{
                                        backgroundColor: `${note.owner.color}`
                                    }}>
                                    <div className='thumb-note'>
                                        <i className="fa-solid fa-thumbtack"></i>
                                    </div>
                                    <div className='profile-holder'>
                                        <i className="fa-solid fa-user"></i>
                                        <p>{note.owner.name}</p>
                                    </div>

                                    <p className='title-post'>{note.title}</p>

                                    <p className='descrip-post'>{note.description}</p>

                                    <p className='time-post'><i className="fa-solid fa-calendar-days"></i>{dayjs(note.time).format('D MMMM YYYY h:mm A')}</p>
                                </div>
                            ))}

                        </div>
                    </div>

                    {postDisplay && (
                        <div className='note-post'>
                            <div className='note-post-display'>

                                <div className='close-button' onClick={() => setPostDisplay(null)}>
                                    <i className="fa-solid fa-xmark"></i>
                                </div>
                                <div className='note-title-display'>
                                    <p>{postDisplay?.title}</p>
                                    <p className='descrip'>Title</p>
                                </div>

                                <div className='note-descrip-display'>
                                    <div className='descrip-label'>Description</div>
                                    <div className='description-display'>
                                        {postDisplay?.description}
                                    </div>
                                </div>

                                <div className='note-user-time'>
                                    <div className='note-user'>
                                        <i style={{
                                            color: `${postDisplay?.owner.color}`
                                        }} className="fa-solid fa-user"></i>
                                        <div className='user-name-display'>
                                            <p className='user-name'>{postDisplay?.owner.name}</p>
                                            <p className='user-address'>{postDisplay?.owner.address}</p>
                                        </div>
                                    </div>

                                    <div className='note-time'>
                                        <div className='note-time-create'>
                                            <i className="fa-solid fa-calendar-days"></i>
                                            <p>{dayjs(postDisplay?.time).format('D MMMM YYYY h:mm A')}</p>
                                        </div>
                                        <div className='note-time-update'>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                            <p>Edited:  {postDisplay?.lastModified > postDisplay?.time + 1000 ? dayjs(postDisplay?.lastModified).format('D MMMM YYYY h:mm A') : ''}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>


            {showError.show && (
                <div className='error-no-user'>
                    <div className='error-container'>
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <p>{showError.message}</p>
                        <button onClick={() => setShowError({ show: false, message: '' })}>Got it!</button>
                    </div>
                </div>
            )}

            {showDelete.show && (
                <div className='delete-confirm'>
                    <div className='delete-container'>
                        <i className="fa-solid fa-trash-can"></i>
                        <p>Are you sure you want to delete <span>{showDelete.message}</span> ?</p>
                        <div className='button-holder'>
                            <button onClick={() => deleteNote(showDelete.id)}>Yes</button>
                            <button onClick={() => setShowDelete({ show: false, message: '', id: '' })}>No</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
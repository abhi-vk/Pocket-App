
import React, { useState } from 'react';
import disabledIcon from '../assets/send.png';
import sendIcon from '../assets/Vector (4).png';
import circle from '../assets/Ellipse 23.png';
import back from '../assets/Vector (5).png';

const Notes = ({ groupSelect, groups, setGroups }) => {
  const [note, setNote] = useState('');
  const [editing, setEditing] = useState(-1);
  let notes = groupSelect.notes;

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = () => {
    let newGroup = [...groups];
    let Ctdgroup = newGroup[groupSelect.id];

    let time = `${new Date().toLocaleTimeString('en-us', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })}`;

    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.toLocaleDateString('en-US', { month: 'short' });
    let year = currentDate.getFullYear();

    let date = `${day} ${month} ${year}`;

    if (editing === -1) {
      Ctdgroup['notes'].push({ id: Date.now(), note, date, time });
    } else {
      Ctdgroup['notes'][editing].note = note;
      Ctdgroup['notes'][editing].date = date;
      Ctdgroup['notes'][editing].time = time;
    }

    localStorage.setItem('groups', JSON.stringify(newGroup));
    setGroups(newGroup);
    setNote('');
    setEditing(-1);
  };

  const keypress = (e) => {
    if (e.code === 'Enter') {
      handleSubmit();
      setNote('');
    }
  };

  const handleUpdateNote = (index) => {
    setNote(notes[index].note);
    setEditing(index);
  };

  return (
    <div className='w-screen md:w-[79%] absolute h-screen md:h-auto right-0 overflow-hidden md:overflow-hidden'>
      <div className='h-auto bg-custom-blue w-auto flex items-center pl-4 p-2'>
        <img src={back} alt="back" className='block md:hidden pr-1' onClick={()=>window.location.href = '/'}/>
        <div
          className='w-[3rem] h-[3rem] md:w-[3.2rem] md:h-[3.2rem] rounded-full flex items-center justify-center text-white text-[16px] mr-2'
          style={{ background: groupSelect.color }}
        >
          {groupSelect.groupName?.split(' ')
              .filter((word, index, array) => index === 0 || index === 1)
              .map(word => word[0].toUpperCase())
              .join('')}
        </div>
        <h2 className='font-roboto font-medium ml-2 text-white text-lg '>{groupSelect.groupName}</h2>
      </div>
      <div className='overflow-y-auto bg-banner-blue h-[70vh] md:h-[65vh]' >
        {notes.map((note, index) => (
          <div key={index} className='bg-white w-auto m-4 min-h-[15rem] md:m-4 md:max-w-[71.5rem] md:min-h-[10rem] relative top-0 md:left-3  custom-shadow rounded-[5px]' onClick={() => handleUpdateNote(index)}>
            {editing ===index ? (
              <>
                <div className='flex flex-col'>
                  <textarea
                    className=' w-auto m-4 min-h-[15rem] md:m-4 md:max-w-[71.5rem] md:min-h-[10rem] top-0 md:left-3 bg-transparent rounded-[5px] border-none'
                    type="text"
                    value={note.note}
                    onChange={handleChange}
                    placeholder="Here’s the sample text for sample work"
                    onKeyDown={keypress}
                  ></textarea>
                </div>
              </>
            ) : (
              <>
                <div className='flex flex-col'>
                  <p className='font-roboto font-normal text-black p-2 m-3 md:m-4'>{note.note}</p>
                  <div className='flex absolute bottom-1 md:bottom-2 right-10 md:right-14'>
                    <p className='font-roboto text-date-color font-medium mr-2'>{note.date}</p>
                    <img src={circle} className='w-2 h-2 mt-2 mr-2' alt='circle' />
                    <p className='font-roboto text-date-color font-medium '>{note.time}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className='bg-custom-blue relative h-[10rem] p-[0.8rem] md:h-[11.9rem] md:p-6 flex items-center justify-center'>
        <textarea
          className='w-[90vw] h-[17vh] md:w-[75vw] md:h-[20vh] custom-border font-roboto pl-5 pt-5 text-base leading-none'
          type="text"
          value={note}
          onChange={handleChange}
          placeholder="Here’s the sample text for sample work"
          onKeyDown={keypress}
        ></textarea>
        {note.trim() === '' ? (
          <img src={disabledIcon} className='absolute w-[1.5rem] bottom-12 right-8 md:w-[1.8rem] md:h-[1.2rem] md:bottom[2.3rem] md:right-[3rem]' alt="EmptyImg" />
        ) : (
          <img
            src={sendIcon}
            className='absolute w-[1.5rem] bottom-12 right-8 md:w-[1.8rem] md:h-[1.2rem] md:bottom[2.3rem] md:right-[3rem]'
            alt="SendImg"
            onClick={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Notes;
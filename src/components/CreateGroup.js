
import React, { useState } from 'react'


const CreateGroup = ({
    onClose,
    groups,
    setGroups
}) => {
  const [Data, setData] = useState({ grpName: ' ', color: ' ' });
  
    const color = [
        '#B38BFA',
        '#FF79F2',
        '#43E6FC',
        '#F19576',
        '#0047FF',
        '#6691FF',
      ];
    const handleChange =(e)=>{
      e.preventDefault();
      setData({ ...Data, [e.target.name]: e.target.value });
      console.log(Data.grpName);
    }
    const handleChangeColor =async(e)=>{
      e.preventDefault();
      const colorValue =  await e.target.getAttribute('color')
      setData({
        ...Data,
        [e.target.name]: colorValue,
      });
      console.log(Data.color)
    }
    const handleSubmit=(e)=>{
         e.preventDefault();
         if(Data.color!==''){
          const existingGroup = groups.filter(group => group.groupName.toLowerCase() === Data.grpName.toLowerCase());
            if (existingGroup.length > 0) {
              alert('Group with the same name already exists. Please create a new group with a different name.');
            } else {
              let newGroup = [
                ...groups,
                {groupName : Data.grpName,
                color:Data.color,
                notes:[],
                id:groups.length,}
                ]
                setGroups(newGroup);
                localStorage.setItem('groups', JSON.stringify(newGroup));
                onClose();
            }
          }else{
            onClose();
          }
      }

    const handleCloseModal = (e) => {
      if (e.target.classList.contains('hs-overlay')) {
          onClose();
      }
  };

  return (
    <div className='fixed hs-overlay w-full  h-full bg-slate-200 bg-opacity-70 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50' onClick={handleCloseModal}>
      <div className=' w-[320px] md:w-[560px] h-[200px] md:h-[210px] rounded-[8px] border-[0.88px] border-solid border-[#cccccc] md:rounded-[6px] bg-white p-5 md:p-[35px] absolute md:top-72 md:left-72'>
      <h2 className='font-roboto text-black text-lg md:text-xl font-medium leading-10 md:leading-160  tracking-[0.035px] md:tracking-wider'>Create New Group</h2>
            <label className='font-roboto text-black font-medium text-base md:text-lg leading-10 md:leading-[160%] tracking-[0.035px] md:tracking-[0.956px] px-0'>Group Name</label>
            <input
              type="text"
              className='w-[150px] h-[23px] md:w-[300px] md:h-[35px] rounded-[10px] md:rounded-[22px] border-[0.88px] md:border-2 border-[#cccccc] text-[#979797] text-[10px] md:text-[18px] mx-4 md:mx-9 px-2 md:px-6 md:my-5 font-roboto font-normal'
              name="grpName"
              placeholder="Enter group name"
              onChange={handleChange}
            />
            <label className='font-roboto text-base md:text-[18px] font-medium leading-10 md:leading-[160%] tracking-wide md:tracking-[0.956px] pr-4 md:pr-9 relative md:bottom-[10px]'>Choose Colour</label>
            {color.map((color, index) => (
              <button
                name="color"
                color={color}
                key={index}
                id={color}
                style={{
                  background: color,
                }}
                className={`cursor-pointer transition-transform hover:translate-y-[-2px] w-4 h-4 md:w-[28px] md:h-[28px] rounded-[25px] mt-3 md:-mt-0.5 mr-2 md:mr-4`}
                onClick={handleChangeColor}
              ></button>
            ))}
            <button className=' w-[200px] h-[28px] md:w-[100px] md:h-[30px] bg-custom-blue rounded-[6px] md:rounded-[11px] text-white font-roboto text-[15px] font-normal relative top-3 left-10 md:-top-[4px] md:left-[400px] cursor-pointer' onClick={handleSubmit}>
              Create
            </button>
      </div>
    </div>
  )
}

export default CreateGroup

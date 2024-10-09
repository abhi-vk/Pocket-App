
import { useEffect, useState} from 'react';
import { Outlet} from 'react-router-dom';
import CreateGroup from './CreateGroup';
import Notes from './Notes';

const Aside = () => {
  
  const [openModal,setOpenModal] = useState(false)
  const [groups,setGroups] = useState([])
  const [groupSelect, setGroupSelect] = useState(null);
  const [asideHidden, setAsideHidden] = useState(false);
  
  const fetchGroup= async()=>{
    let storedGroups = localStorage.getItem('groups');
    if (storedGroups) {
      let groups = await JSON.parse(storedGroups);
      setGroups(groups);
    }
  };
  useEffect(()=>{
     fetchGroup();
  },[]);

  const handleClick = (group) => {
    setGroupSelect(group);
    setAsideHidden(true);
  };

  console.log(groups);
  
  
  return (
    
    <div className=" h-screen md:min-h-screen md:flex md:flex-row overflow-hidden">
      
      <div className={`pt-5 md:pt-10 md:min-h-[100vh] md:w-[21%] bg-white relative ${asideHidden && window.innerWidth <= 768 ? 'hidden' : ''}`}
      >
        <h1 className="text-black font-roboto font-bold text-2xl top-0 left-0 px-20 w-full z-10 leading-normal tracking-wide ">
          Pocket Notes
        </h1>
        <div className="mt-5 md:mt-5 overflow-x-hidden overflow-y-auto" style={{ maxHeight: 'calc(100vh - 130px)' }}>
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className={`groupItem ${
                      groupSelect === group ? 'selected' : ''
                    }`}
                    onClick={() => handleClick(group)}
                  >
                  <div className='flex items-center'>
                  <div
                      className="w-[3.4rem] h-[3.4rem] bg-white text-white rounded-full text-[1rem] flex items-center justify-center"
                      style={{ background: group.color }}
                    >
                     {group.groupName?.split(' ')
                            .filter((word, index, array) => index === 0 || index === 1)
                            .map(word => word[0].toUpperCase())
                            .join('')}

                    </div>
                    <h2 className="font-roboto font-medium tracking-wider flex flex-nowrap ml-3 mt-3 text-lg">{group.groupName}</h2>
                  </div>
                  </div>
                ))}
              </div>
        <button className="fixed bg-custom-blue text-white font-semibold rounded-full w-14 md:w-12 h-14 md:h-12 flex items-center justify-center text-4xl bottom-6 right-6 md:bottom-6 md:left-64 pb-3" onClick={()=>setOpenModal((prev)=>(!prev))}>
          +
        </button>
        {
          openModal && (
            <CreateGroup onClose={()=>setOpenModal(prev=>!prev)} groups={groups} setGroups={setGroups} />
          )
        }
      </div>
      {
        groupSelect ? (
          <div >
          <Notes 
              groupSelect={groupSelect}
              groups={groups}
              setGroups={setGroups}   
        />
          </div>
          
        ) : (
        <main className='min-h-[100vh] w-[79%] hidden md:block'>
        <Outlet />
         </main>
        )
      }
      </div>
  );
 
}

export default Aside



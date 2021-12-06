import React,{useMemo,useEffect} from "react";
import { useRecoilState } from "recoil";
import { searchState } from "../atoms/SearchAtom";
import { debounce } from "lodash";
import Image from "next/image";
import Mask from '../images/istockphoto-1210279557-1024x1024.png'


function Header() {
  const [search, setSearch] = useRecoilState(searchState);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const debouncedHandleSearch = useMemo(
    () => debounce(handleSearch, 1500),
    [search]
  );

  useEffect(() => {
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, []);
  return (
    <div className=' bg-[#081217] flex'>
      <div className="p-5 mt-2 items-center flex-grow">
        <input
          className="text-sm p-2 px-2 outline-none"
          type="text"
          placeholder="search country name"
          onChange={debouncedHandleSearch}
        />
    
      </div>
      <div className='pr-5'>
      <Image 
          src={Mask}
          width={100}
          height={100}
          alt="mask"
          objectFit='cover'
        />
     </div>
    </div>
  );
}

export default Header;

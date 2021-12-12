import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { searchState } from "../atoms/SearchAtom";
import Image from "next/image";
import Mask from "../images/istockphoto-1210279557-1024x1024.png";
import {SearchIcon} from '@heroicons/react/outline'


function Header() {
  const [search, setSearch] = useRecoilState(searchState);
  const searchRef = useRef(null)

  const handleSubmitSearch = (e)=>{
    e.preventDefault()
    const term = searchRef.current.value
    setSearch(term)
  }

  return (
    <div className=" bg-[#081217] flex justify-between">
      <form className="p-5 items-center relative flex">
        <input
          className="text-xs p-2 px-5 outline-none flex-grow"
          type="text"
          placeholder="Search country name"
          ref={searchRef}
        />
        <SearchIcon className={`w-5 h-5 absolute right-7 ${search ? 'text-gray-700':'text-gray-400'}`}/>
      <button type="submit" hidden onClick={handleSubmitSearch}>Enter</button>
      </form>
      <div className="pr-5">
        <Image
          src={Mask}
          width={70}
          height={70}
          alt="mask"
          objectFit="cover"
        />
      </div>
    </div>
  );
}

export default Header;

import React,{useMemo,useEffect} from "react";
import { useRecoilState } from "recoil";
import { searchState } from "../atoms/SearchAtom";
import { debounce } from "lodash";

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
    <div className=' bg-blue-300'>
      <div className="p-5 items-center max-w-6xl mx-auto">
        <input
          className="text-sm p-2 px-2 outline-none"
          type="text"
          placeholder="search country name"
          onChange={debouncedHandleSearch}
        />
      </div>
    </div>
  );
}

export default Header;

import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { searchState } from "../atoms/SearchAtom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { countryInfoState } from "../atoms/CountryInfoAtom";

function DisplayData() {
  const [search, setSearch] = useRecoilState(searchState);
  const [loading, setLoading] = useState(false);
  const [countryInfo, setCountryInfo] = useRecoilState(countryInfoState);

  const options = {
    method: "GET",
    url: "https://covid-19-data.p.rapidapi.com/country",
    params: { name: search},
    headers: {
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key": "ddb2864c62mshd3a06510c7ee159p1b122fjsnd2e3399bdbd7",
    },
  };

  const fetchData = async () => {
    setLoading(true);
    const data = await axios
      .request(options)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    setLoading(false);
    setCountryInfo(data);
  };

  useEffect(() => {
    fetchData();
  }, [search]);


  return (
    <div className="w-[400px] h-[120px] text-white">
      {loading ? (
        <div className="p-5">
          <ClipLoader color={"#93c5fd"} size={20} />
        </div>
      ) : search ? (
        countryInfo?.map((info) => (
          <div className="p-5 text-sm" key={info.code}>
            <h1>Country : {info.country}</h1>
            <p>Case confirmed : {info.confirmed}</p>
            <p>Deaths : {info.deaths}</p>
            <p>Recovered : {info.recovered}</p>
          </div>
        ))
      ) : (
        <h1 className="p-5">Enter country to search... </h1>
      )}
    </div>
  );
}

export default DisplayData;

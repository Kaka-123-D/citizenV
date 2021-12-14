import React from "react";
import Declare from "../../../containers/Declare";
import LogoutButton from "../../../containers/Logout";
import ProviderAcc from "../../../containers/ProvideAcc";
import SearchBar from "../../../containers/SearchBar";
import TimeDeclareForm from "../../../containers/Time";
import PersonList from "../../../containers/personList";

export default function Home() {
  return (
    <div>
      Hello from Home User!
      <LogoutButton />
      <br />
      <br />
      Cấp tài khoản cho cấp dưới
      <ProviderAcc />
      <br />
      <br />
      Khai báo mã
      <Declare />
      <br />
      <br />
      List khu vực đã khai báo
      <SearchBar />
      <br />
      <br />
      Mở thời gian khai báo
      <TimeDeclareForm />
      <br/>
      <br/>
      Danh sách dân số: 
      <PersonList />
    </div>
  );
}

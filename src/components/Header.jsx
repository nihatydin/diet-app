import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLeaf} from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div className="flex flex-row items-center justify-between p-4">
      <div>
        <h2 className="text-2xl font-semibold text-blue-900 tracking-tight">
          Gluten Free Healthy Recipes
        </h2>
      </div>
      <div>
        <FontAwesomeIcon
          style={{color: "green", fontSize: "30px"}}
          icon={faLeaf}
        />
      </div>
    </div>
  );
}

export default Header;

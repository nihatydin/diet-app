import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLeaf} from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div className="flex flex-row items-center justify-between p-4">
      <div>
        <h2 className="text-2xl font-bold text-green-900 tracking-tight">
          <span className="text-orange-900">Gluten</span>Free Healthy Recipes
        </h2>
      </div>
      <div>
        <FontAwesomeIcon
          className="text-green-900"
          style={{fontSize: "30px"}}
          icon={faLeaf}
        />
      </div>
    </div>
  );
}

export default Header;

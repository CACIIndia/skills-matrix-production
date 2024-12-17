"use client";
import { useAppContext } from "../context/AppContext";

function SearchSkills(){
    const { selectedItems, toggleSelectedItem } = useAppContext();
    return (<div>{selectedItems.map((item:any) => <div key={item.id}>{item.name}</div>)}</div>)
}
export default SearchSkills;
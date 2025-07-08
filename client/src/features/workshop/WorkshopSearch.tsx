import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store"; 
import { setSearchTerm } from "./workshopSlice"; 
import { useEffect, useState } from "react";

export default function WorkshopSearch() {
  const { searchTerm } = useAppSelector(state => state.workshop);
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState(searchTerm);
  useEffect(() => {
    setTerm(searchTerm);
  }, [searchTerm]);

  const debouncedSearch = debounce((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setSearchTerm(event.target.value));
  }, 500); 

  return (
    <TextField
      label='Atölye Adına Göre Ara' 
      variant="outlined"
      fullWidth 
      type="search" 
      value={term} 
      onChange={e => {
        setTerm(e.target.value); 
        debouncedSearch(e); 
      }}
      className="mb-4" 
    />
  );
}
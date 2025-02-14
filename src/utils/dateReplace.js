const dateReplace = (date)=>{
    if (!date) return 
    return date.replace(/\./g, "-")
}
export default dateReplace;

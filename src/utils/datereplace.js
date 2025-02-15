
/**
 * 
 * @param {Date} dateの記載変更 
 * @returns 
 */ 
const dateReplace = (date) => {
    if (!date) return
    return date.replace(/\./g, "-")
}
export default dateReplace;

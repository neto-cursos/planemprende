export const validateNumber=(condition)=>{
   //receives a condition
   //converts to number integer
   //check if is a number and if condition is greater than 0
   //return condition or null
	condition = parseInt(condition);
		if( !isNaN(condition) && (condition > 0) ) {
			return condition;
		}
		return null;
}

export const validateAbstract=()=>{
    
}
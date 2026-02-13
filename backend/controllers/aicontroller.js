export const  generateinterviewquestion=async (req,res)=>{
  try{

  }catch(error){
    console.log('error in the generate interview question controller ',error.message);
    res.status(500).json({message:"intrnal server error "})
  }
}

export const  generateconceptexplanation=async  ()=>{
  try{

  }catch(error){
   console.log('error in the generate concept explanation controller',error.message)
   res.status(500).json({message:"intrnal server error "});
  }
}
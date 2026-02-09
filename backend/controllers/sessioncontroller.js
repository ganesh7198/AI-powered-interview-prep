import Question from "../models/question.models.js"
import Session from "../models/session.models.js";
import Session from "../models/sessionModel.js";
import Question from "../models/questionModel.js";

export const createSession = async (req, res) => {
  try {
   
    const {
      role,
      experience,
      topicsToFocus,
      description,
      questions,
    } = req.body;

    const userId = req.user.id;

   
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

   
    const questionIds = await Promise.all(
      questions.map(async (q) => {
        const questionDoc = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
          note: q.note,
        });

        return questionDoc._id;
      })
    );

    
    session.questions = questionIds;

    await session.save();

    res.status(201).json({
      success: true,
      message: "Session created successfully",
      session,
    });
  } catch (error) {
    console.log("Error in createSession controller:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

 export const getMySession=async (req,res)=>{
       try{
            const session=await Session.find({user:req.user.id}).sort({createdAt:-1}).populate("question");
			res.status(200).json(session);  
	   }catch(error){
           console.log('error in the get my session controller ',error.message)
		   res.status(500).json({message:"intrnal server error "});
	   }
   }

export const getSessionById=async (req,res)=>{
      try{
           const session=await Session.findById(req.parmas.id).populate({path:"question",options:{sort:{isPinned:-1,createdAt:1}}}).exec()
		   if(!session){
			return res.status(404).json({sucess:false,message:"Session not found"});

		   }
		   res.status(200).json({success:false,session});
	  }catch(error){
          console.log('error in the getsessionbyid controller ',error.message)
		  res.status(500).json({message:"intrnal server error"})
	  }
   }

export const deleteSession=async (req,res)=>{
       try{
            const  session=await Session.findByID(req.parmas.id)
			if(!session){
				res.status(404).json({message:"session not found "});
			}
			if(session.user.toString()!==req.user.id){
				return res.status(401).json({message:" user is not loged in "})
			}
			await Question.deleteMany({session:session._id})
			await session.deleteOne();
			res.status(200).json({message:"session deleted successfully"});
	   }catch(error){
        console.log('error in the delete session controller ',error.message)
		res.status(500).json({message:"intrnal server error"})
	   }
   } 
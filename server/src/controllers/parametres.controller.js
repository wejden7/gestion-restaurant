import parametresModel from "#models/parametres.model.js";


export const handleError = async (error, req, res, next) => {
  return res.status(500).json({
    message: "not Autorize",
    data: false,
    errors: error,
  });
};

export const findContoller = async (req, res, next) => {
  const { id } = req.params;
  try {
    const parametres = await parametresModel.findById(id);
    return res.status(200).json({
      message: "",
      data: parametres,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateContoller = async (req, res, next) => {
  const { id } = req.params;
  try {
    const parametres = await parametresModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
      message: "",
      data: parametres,
    });
  } catch (error) {
    return next(error);
  }
};

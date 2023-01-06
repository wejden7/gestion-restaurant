import parametresModel from "#models/parametres.model.js";
import { etablissementByUser } from "#service/etablissement.service.js";

export const handleError = async (error, req, res, next) => {
  return res.status(500).json({
    message: "not Autorize",
    data: false,
    errors: error,
  });
};

export const findContoller = async (req, res, next) => {
  const { user } = req;
  try {
    const { _id } = await etablissementByUser(user);
    const parametres = await parametresModel.findOne({
      etablissement: _id,
    });
    return res.status(200).json({
      message: "",
      data: parametres,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateContoller = async (req, res, next) => {
  const { user } = req;
  try {
    const { _id } = await etablissementByUser(user);
    const parametres = await parametresModel.findOneAndUpdate(
      { etablissement: _id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({
      message: "",
      data: parametres,
    });
  } catch (error) {
    return next(error);
  }
};

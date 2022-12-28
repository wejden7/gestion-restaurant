import React from "react";
import moment from "moment-timezone";
import { Input } from "components";
import useFormPresence from "Hooks/UseFormPresence";
import "./PresenceDetail.style.scss";
import * as images from "utils/assets/images";
import { status } from "utils/Data/Data";
import BarLoader from "react-spinners/BarLoader";

const getDateFormat = (date) => {
  return moment(date).format(" DD MMMM YYYY");
};

const ImgStatus = ({ status }) => {
  switch (status) {
    case "Work":
      return <img className="img-status" src={images.undraw_work} alt="" />;
    case "Not-Work":
      return <img className="img-status" src={images.undraw_vide} alt="" />;
    case "Quite":
      return <img className="img-status" src={images.undraw_work} alt="" />;
    case "Conge-Paye":
      return <img className="img-status" src={images.undraw_conge} alt="" />;
    case "conge-Maladie-Certificat":
      return <img className="img-status" src={images.undraw_sick} alt="" />;
  }
};

const FromPresence = ({ data, update }) => {
  const { register, onSubmit, errors, isSubmitting, error, success, control } =
    useFormPresence(data, update);
  return (
    <form className="form-presence" onSubmit={onSubmit}>
      <h1>{update ? "update" : "add"}</h1>
      <label htmlFor="">
        Start :
        <input
          {...register("timeStart")}
          type="datetime-local"
          min={moment(data.date).startOf("days").format("yyyy-MM-DDTHH:mm")}
          max={moment(data.date).endOf("days").format("yyyy-MM-DDTHH:mm")}
        />
      </label>
      <label htmlFor="">
        End :
        <input
          {...register("timeEnd")}
          type="datetime-local"
          min={moment(data.date).startOf("days").format("yyyy-MM-DDTHH:mm")}
          max={moment(data.date)
            .add(1, "days")
            .endOf("days")
            .format("yyyy-MM-DDTHH:mm")}
        />
      </label>
      <label>
        Status
        <Input.InputSelect
          control={control}
          name="status"
          data={status}
          errors={errors}
        />
      </label>
      <label htmlFor="">
        Commit :
        <textarea {...register("commit")} rows="3" />
      </label>
      <button type="submit">
        {isSubmitting ? <BarLoader color="#fefbd8" /> : "Save"}
      </button>
    </form>
  );
};

const PresenceDetail = (props) => {
  const { data, employers } = props;
  return (
    <div className="presence-detail">
      <div className="hedear">
        <h1 className="name">{employers.name}</h1>
        <span className="date">{getDateFormat(data.date)}</span>
      </div>
      <div className="body-Presence">
        <div className="img-body">
          <ImgStatus status={data.status} />
          <h1 className="sous-titre-img" data-text={data.status}>
            {data.status}
          </h1>
        </div>
        <div className="divider" />
        <FromPresence data={data} update={!data.add} />
      </div>
    </div>
  );
};

export default PresenceDetail;
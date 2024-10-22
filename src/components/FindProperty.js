import { React } from "react";
import MapComponent from "./MapComponent";
import { toast } from "react-toastify";
import { getGeoJson, setLoading } from "../redux/actions/other";
import { useDispatch } from "react-redux";
import { setSelectedProperty } from "../redux/actions/other";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
var parser = require("parse-address");

const FindProperty = (props) => {
  const dispatch = useDispatch();
  const {address = '', zip_code = ''} = props;

  const initialValue = { address: address, zip: zip_code };

  const propertySchema = Yup.object().shape({
    address: Yup.string().required("Required"),
    zip: Yup.string().required("Required"),
  });

  const handleSubmit = (values) => {
    const parsedAddress = parser.parseLocation(`${values["address"]} ${values["zip"]}`);
    dispatch(setLoading(true));

    if (!parsedAddress || !parsedAddress.number || !parsedAddress.street || !parsedAddress.zip) {
      toast.error("Could not find address! Please try again!");

      dispatch(setLoading(false));
    }

    const data = {"address": values["address"], "zip": values["zip"]};
    dispatch(getGeoJson(data)).then(
      (response) => {
        dispatch(setLoading(false));
        if (response && response.length > 0) {
          dispatch(
            setSelectedProperty({
              query: {
                address: values["address"],
                zip: values["zip"],
              },
              response: response,
            })
          );
          // props.navigateEnrolDetails(response);
          props.navigateEnrolDetails({
            query: {
              address: values["address"],
              zip: values["zip"],
            },
            response: response,
          });
        } else {
          toast.error("Could not find address! Please try again!");
        }
      },
      (error) => {
        dispatch(setLoading(false));
        const message =
          (error.response && error.response.data && error.response.data) ||
          error.message ||
          error.toString();
        console.error(message);
      }
    );
  };

  return (
    <>
      <section id="map-section">
        <div className="container-fluid p-0 m-0">
          <div className="row">
            <div className="col-12">
              <div className="position-absolute p-4 bg-dark shadow-lg map-box2">
                <div className="">
                  <Formik
                    initialValues={initialValue}
                    validationSchema={propertySchema}
                    onSubmit={handleSubmit}
                  >
                    {({ errors, touched, isValidating }) => (
                      <Form className={"mt-5"}>
                        <address className="w-75">
                          <h4 className="text-light">Enter Your Information </h4>
                          <p className="text-light" style={{ fontSize: "12px" }}>
                            Enter your address below to access data on file for your land.
                          </p>

                          <div className="form-group mb-3">
                            <Field
                              name="address"
                              placeholder="Address"
                              className={`form-control ${
                                touched.address && errors.address ? "is-invalid" : ""
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="address"
                              className="invalid-feedback"
                            />
                          </div>

                          <div className="form-group mb-3">
                            <Field
                              name="zip"
                              placeholder="Zip/Postal Code"
                              className={`form-control ${
                                touched.zip && errors.zip ? "is-invalid" : ""
                              }`}
                            />
                            <ErrorMessage component="div" name="zip" className="invalid-feedback" />
                          </div>
                        </address>
                        <button
                          type="submit"
                          className="btn btn-outline-light form-control w-75"
                          style={{ margin: "25px 0px" }}
                        >
                          FIND MY LAND
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="embed-responsive ">
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <div className="iframe-container">
                      <MapComponent
                        className={"find-property-map"}
                        center={[36.646755, -118.705333]}
                        zoom={150}
                        jpa={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FindProperty;

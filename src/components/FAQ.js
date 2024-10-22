import React from "react";

const FAQ = () => {

    return (
      <>
        <section className="container-fluid mb-5" id="faq">
          <div className="faq">
            <h2 className="text-dark text-center mb-5">
              Frequently Asked Questions
            </h2>
            <details>
              <summary>
                Is there a cost to enroll my property in Resilient Sierra?
              </summary>
              <div className="content">
                <p>
                  Enrolling your property in the Resilient Sierra program is
                  free of charge. However, there may be costs associated with
                  removing woody biomass feedstock from your property, depending
                  on the amount and type of material being removed.
                </p>
                <p>
                  Resilient Sierra works to minimize any potential costs as
                  much as possible with feedstock sale offset, and any costs
                  will be communicated to you prior to any work being done.
                </p>
              </div>
            </details>
            <details>
              <summary>
                How do I know if my property is eligible for the program?
              </summary>
              <div className="content">
                <p>
                  To be eligible for the Resilient Sierra program, your property
                  must be located within one of the five participating counties
                  in the Tuolumne area. Additionally, your property must have a
                  certain amount of woody biomass feedstock available for
                  removal. A Resilient Sierra representative can work with you
                  to determine if your property is eligible and provide a
                  detailed estimate of the amount and type of feedstock
                  available.
                </p>
              </div>
            </details>
            <details>
              <summary>
                What happens if the harvesters cause soil/erosion damage?
              </summary>
              <div className="content">
                <p>
                  We understand the importance of maintaining healthy forest
                  ecosystems, and we are committed to protecting your property
                  while promoting fire safety and forest resilience.
                </p>
                <p>
                  If any soil or erosion damage occurs during the woody biomass
                  removal process, the responsible party will be required to
                  take immediate action to mitigate and remediate the damage
                  caused. Our program also takes steps to ensure that the woody
                  biomass removal process is conducted in a responsible and
                  sustainable manner that minimizes soil disturbance and
                  erosion.
                </p>
              </div>
            </details>
            <details>
              <summary>
                How long does being scheduled for feedstock removal take?
              </summary>
              <div className="content">
                <p>
                  Once a feedstock product type and amount is requested by a
                  business, enrolled landowners that have the requested product
                  on their property are put into a schedule for woody biomass
                  removal.
                </p>
                <p>
                  The amount of time it takes for your property to be scheduled
                  will depend on the availability of the requested feedstock
                  product in your area and the number of enrolled landowners
                  with that product type available. A Resilient Sierra
                  representative can provide you with an estimated timeline for
                  scheduling woody biomass removal.
                </p>
              </div>
            </details>
            <details>
              <summary>Do I get any say over what stays and what goes?</summary>
              <div className="content">
                <p>
                  Resilient Sierra operates on a voluntary enrollment basis,
                  which means that enrolled landowners retain control over their
                  property and what is removed. Landowners may specify certain
                  areas or tree species that they do not want removed as part of
                  the woody biomass removal process.
                </p>

                <p>
                  The program works to balance landowner preferences with the
                  needs of the wood industry to ensure a reliable supply of
                  woody biomass feedstock, but landowners have the final say.
                </p>
              </div>
            </details>
          </div>
        </section>
      </>
    );
};

export default FAQ;

import { Helmet } from "react-helmet";

const Faq = () => {
  return (
    <>
      <Helmet>
        <title>FAQs</title>
      </Helmet>
      <div
        style={{ minHeight: "inherit" }}
        className="container m-auto my-5 p-0 d-flex gap-5 flex-column justify-content-center align-items-center"
      >
        <div
          className="d-flex flex-column align-items-stretch rounded shadow bg-white w-100"
          style={{ minHeight: "70vh" }}
        >
          <div className="bg-white p-5 rounded-top">
            <h1 className="text-capitalize">FAQs</h1>
          </div>
          <div className="accordion pb-5" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed p-5 fw-semibold fs-5"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq-accordion-item-1"
                  aria-expanded="false"
                  aria-controls="faq-accordion-item-1"
                >
                  How do I search for a pet?
                </button>
              </h2>
              <div
                id="faq-accordion-item-1"
                className="accordion-collapse collapse show px-5 pb-2"
              >
                <div
                  className="accordion-body"
                  style={{ textAlign: "justify" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusantium, saepe quibusdam numquam at labore sunt incidunt
                  eum mollitia molestias odit nostrum ipsum nemo dignissimos
                  corrupti laborum praesentium vitae fugit inventore error quasi
                  nesciunt. Ab facere fuga modi tempore excepturi, ut officiis
                  voluptatum iusto aut molestiae voluptatem eos? Ipsam, voluptas
                  minus.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed p-5 fw-semibold fs-5"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq-accordion-item-2"
                  aria-expanded="false"
                  aria-controls="faq-accordion-item-2"
                >
                  How do I adopt a pet?
                </button>
              </h2>
              <div
                id="faq-accordion-item-2"
                className="accordion-collapse collapse show px-5 pb-2"
              >
                <div
                  className="accordion-body"
                  style={{ textAlign: "justify" }}
                >
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Architecto, minima. Dicta quibusdam, placeat reiciendis
                  voluptate adipisci vero provident dolorum nisi itaque nostrum
                  id illum suscipit nesciunt repudiandae consectetur dolore
                  perspiciatis tempora hic sit ab tenetur. Earum consectetur
                  assumenda ipsum, corporis expedita, ut neque omnis saepe
                  dolorum quod quo esse facilis quas inventore molestias nobis
                  quisquam in ipsa dolore vel error itaque sunt repellendus
                  officia. Quos, saepe? Facilis rerum harum expedita dolore
                  dolorem quis quam perferendis praesentium, delectus iusto
                  excepturi deleniti accusamus, reiciendis rem ipsam eveniet
                  beatae consequatur qui dolor commodi? Magnam eius harum,
                  perferendis et aliquid natus ut exercitationem sint.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed p-5 fw-semibold fs-5"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq-accordion-item-3"
                  aria-expanded="false"
                  aria-controls="faq-accordion-item-3"
                >
                  Can I return the pet I adopted?
                </button>
              </h2>
              <div
                id="faq-accordion-item-3"
                className="accordion-collapse collapse show px-5 pb-2"
              >
                <div
                  className="accordion-body"
                  style={{ textAlign: "justify" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  odit blanditiis omnis eius, est explicabo eos nihil vitae id,
                  maiores, asperiores quis inventore reiciendis sit soluta
                  animi! Voluptas placeat magnam ad minus ratione recusandae
                  nisi modi quae accusamus itaque. Dolorem exercitationem amet
                  impedit dolores mollitia animi blanditiis quod labore
                  voluptatem quibusdam laudantium, numquam iusto aut, laborum
                  quidem incidunt minima pariatur earum nesciunt sequi saepe
                  eveniet? Architecto quis eveniet, et ipsa voluptas odio
                  delectus officiis quidem, praesentium, commodi maiores rem hic
                  impedit nobis. Culpa quibusdam tenetur officiis eum! Ut,
                  totam? Cumque a vitae assumenda ab explicabo. Corporis beatae
                  voluptatem quos rerum magni. Incidunt voluptate praesentium
                  nemo, sequi ab beatae. Similique modi aperiam tenetur aliquid
                  repellat dolores, sapiente deserunt cum odio? Ipsam unde omnis
                  facilis ratione neque exercitationem a tempore optio, officiis
                  facere, sequi voluptates animi atque! Quidem iste voluptas
                  aperiam numquam incidunt inventore odio, vero ducimus neque
                  earum voluptate id quia adipisci, commodi dolorem amet
                  doloribus tenetur odit quod similique assumenda mollitia!
                  Fugiat vel suscipit sunt alias enim sapiente ab accusamus
                  nobis quod rerum asperiores fuga velit quas harum dolores
                  laborum recusandae molestiae id quos illo, exercitationem
                  mollitia non expedita aliquam? A non dignissimos nisi
                  obcaecati eligendi nesciunt temporibus ad quibusdam,
                  aspernatur, quasi voluptatem architecto quis iste, ea
                  asperiores nemo cum itaque dolorem neque eaque eos.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 text-center fw-semibold fs-5 text-secondary">
          Do you still have a question? Contact us and we'll be happy to help.
        </div>
      </div>
    </>
  );
};

export default Faq;

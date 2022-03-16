import React from "react";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CTooltip,
} from "@coreui/react";
import { BsEyeFill } from "react-icons/bs";

import { REPOSITORY_STATIC_MEDIA_BASE_URL } from "../../../../utils/configs";

const ItemDetailModal = ({ dataDetail }) => {
  const [showItemDetailModal, setShowItemDetailModal] = React.useState(false);
  return (
    <>
      <CTooltip content="Show detail" placement="left">
        <BsEyeFill
          type="button"
          className="text-sre"
          size={16}
          onClick={() => setShowItemDetailModal(true)}
        />
      </CTooltip>

      <CModal
        show={showItemDetailModal}
        onClose={() => setShowItemDetailModal(false)}
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>Item Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="row">
            <div className="col-sm-5">
              <div className="pb-3">
                <h6 className="font-weight-bold m-0">Title</h6>
                <span>{dataDetail.title}</span>
              </div>

              <div className="pb-3">
                <h6 className="font-weight-bold m-0">Author</h6>
                <span>{dataDetail.author}</span>
              </div>

              <div className="pb-3">
                <h6 className="font-weight-bold m-0">Issue date</h6>
                <span>{dataDetail.issue_date}</span>
              </div>

              {dataDetail.advisor_of_author && (
                <div className="pb-3">
                  <h6 className="font-weight-bold m-0">Advisor</h6>
                  <span>{dataDetail.advisor_of_author}</span>
                </div>
              )}

              <div className="pb-3">
                <h6 className="font-weight-bold m-0">Type</h6>
                <span>{dataDetail.item_type_info.name}</span>
              </div>

              <div className="pb-3">
                <h6 className="font-weight-bold m-0">Collection</h6>
                <span>{dataDetail.collection_info.name}</span>
              </div>

              {dataDetail.sub_collection_info && (
                <div className="pb-3">
                  <h6 className="font-weight-bold m-0">Sub collection</h6>
                  <span>{dataDetail.sub_collection_info.name}</span>
                </div>
              )}

              <div className="pb-3">
                <h6 className="font-weight-bold m-0">Uploaded by</h6>
                <span>{`${dataDetail.created_by_info.first_name} 
                ${dataDetail.created_by_info.middle_name}
                ${dataDetail.created_by_info.last_name}
                (${dataDetail.created_by_info.employee_id})`}</span>
              </div>

              <div className="pb-3">
                <h6 className="font-weight-bold m-0">Uploaded at</h6>
                <span>{dataDetail.date_of_created}</span>
              </div>
            </div>

            <div className="col-sm-7">
              <div className="pb-3">
                <h6 className="font-weight-bold m-0">Files</h6>
                <ul type="square">
                  {dataDetail.files.map((file) => {
                    return (
                      <li key={file.id}>
                        <a
                          href={`${REPOSITORY_STATIC_MEDIA_BASE_URL}/${file.file_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file.file_name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {dataDetail.subject && (
                <div className="pb-3">
                  <h6 className="font-weight-bold m-0">Subject</h6>
                  <span>{dataDetail.subject}</span>
                </div>
              )}

              {dataDetail.abstract && (
                <div className="pb-3">
                  <h6 className="font-weight-bold m-0">Abstract</h6>
                  <p className="text-justify">{dataDetail.abstract}</p>
                </div>
              )}

              {dataDetail.description && (
                <div className="pb-3">
                  <h6 className="font-weight-bold m-0">Description</h6>
                  <p className="text-justify">{dataDetail.description}</p>
                </div>
              )}

              {dataDetail.citation && (
                <div className="pb-3">
                  <h6 className="font-weight-bold m-0">Citation</h6>
                  <p className="text-justify">{dataDetail.citation}</p>
                </div>
              )}

              {dataDetail.publisher && (
                <div className="pb-3">
                  <h6 className="font-weight-bold m-0">Publisher</h6>
                  <p className="text-justify">{dataDetail.publisher}</p>
                </div>
              )}
            </div>
          </div>
        </CModalBody>
      </CModal>
    </>
  );
};

export { ItemDetailModal };

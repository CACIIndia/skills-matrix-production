import { useAppContext } from "@/app/context/AppContext";
import AddBio from "@/app/profile/bio/AddBio";
import Modal from "@/components/common/Modal";
import { useBioHandlers } from "@/lib/hooks/profile/bio/useBioHandlers";
import { useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { Editor } from "@tinymce/tinymce-react";
import useGetUsers from "@/lib/hooks/useGetUsers";

const Bio = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { profile } = useAppContext();
  // useGetUsers
  const { data: aboutMe, refetch, isLoading } = useGetUsers();
  const { addBioData } = useBioHandlers(refetch);
  const editorRef = useRef(null);
  const handleSaveBio = async () => {
    if (editorRef.current) {
      const bioContent = editorRef.current.getContent();
      const bioData = {
        id: profile?.id,
        aboutMe: bioContent,
      };

      await addBioData(bioData, () => setIsOpen(false));
    }
  };
  return (
    <>
      <div className='lg:gap-7.5 flex h-[100%] flex-col gap-5'>
        <div className='card h-[100%]'>
          <div className='card-header flex items-center justify-between'>
            <h3 className='card-title'>Edit Bio</h3>
          </div>

          <div className='card-body'>
            <div className='mb-2 flex flex-wrap gap-2.5'>
              <div className='m-auto mt-[50px] flex h-[100px] items-center justify-center'>
                <div className='flex h-full flex-col flex-wrap items-center justify-center space-y-4'>
                  <div>No bio found, still some work to do...😄</div>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                    }}
                    className='btn-primary relative mb-[4px] mr-[10px] rounded-[4px] bg-[#0d6efd] p-[6px] text-white transition duration-300 hover:bg-blue-700'
                  >
                    <div className='flex items-center justify-center space-x-1'>
                      <HiOutlineDocumentAdd className='h-6 w-6' />
                      <div>Add Bio</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title='Add Bio'
          customWidth='w-[70vh]'
        >
          <Editor
            apiKey='eycdh8k4ejq9nylgatmemrpxk0j5tmihnzru6zjxo1881ayn' // Optional if using self-hosted TinyMCE
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue='Write your bio here...'
            init={{
              height: 300,
              menubar: false,
              plugins: "emoticons lists link image table",
              toolbar:
                "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent ",
              content_style:
                "body { font-family:Arial,sans-serif; font-size:14px }",
              menu: {
                insert: { title: "Insert", items: "emoticons" },
              },
              branding: false,
            }}
          />
          <div className='mt-4 flex justify-end space-x-2'>
            <button
              onClick={() => setIsOpen(false)}
              className='btn-secondary rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500'
            >
              Cancel
            </button>
            <button
              onClick={handleSaveBio}
              className='btn-primary rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Bio;

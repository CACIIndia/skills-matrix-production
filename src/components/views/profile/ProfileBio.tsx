import { useAppContext } from "@/app/context/AppContext";
import Modal from "@/components/common/Modal";
import { useBioHandlers } from "@/lib/hooks/profile/bio/useBioHandlers";
import { useRef, useState } from "react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { Editor } from "@tinymce/tinymce-react";
import useGetUsers from "@/lib/hooks/useGetUsers";
import toast from "react-hot-toast";
import { Editor as TinyMCEEditor } from "tinymce";

const Bio = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, setProfile } = useAppContext();
  const [isEditorLoading, setIsEditorLoading] = useState(true); // Track loading state
  const { data: aboutMe, refetch, isLoading } = useGetUsers();
  const { addBioData } = useBioHandlers(refetch);
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const handleSaveBio = async () => {
    if (editorRef.current) {
      const bioContent = editorRef.current.getContent();
      const plainText = editorRef.current.getContent({ format: "text" }).trim();

      if (!plainText) {
        toast.error("Bio cannot be empty!");
        return;
      }

      const bioData = {
        id: profile?.id,
        aboutMe: bioContent,
      };

      await addBioData(bioData, () => {
        setProfile((prevProfile: any) => ({
          ...prevProfile,
          aboutMe: bioContent,
        }));
        setIsOpen(false);
      });
    }
  };
  return (
    <>
      <div className='lg:gap-7.5 flex h-[100%] flex-col gap-5'>
        <div className='card h-[100%]'>
          <div className='card-header flex items-center justify-between'>
            <h3 className='card-title'>Edit Bio</h3>
            <button
              className='btn btn-sm btn-icon text-primary hover:bg-primary-hover hover:text-white'
              onClick={() => setIsOpen(true)}
            >
              <i className='ki-filled ki-notepad-edit'></i>
            </button>
          </div>

          <div className='card-body'>
            <div className='mb-2 flex flex-wrap gap-2.5'>
              <div className='m-auto mt-[50px] flex h-[100px] items-center justify-center'>
                <div className='flex h-full flex-col flex-wrap items-center justify-center space-y-4'>
                  {profile?.aboutMe ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: profile.aboutMe }}
                      className='styled-content text-left text-gray-700'
                    />
                  ) : (
                    <div className='flex flex-col items-center justify-center text-center'>
                      <div>No bio found, still some work to do...😄</div>
                      <button
                        onClick={() => setIsOpen(true)}
                        className='btn-primary relative mb-4 mt-2 rounded bg-[#0d6efd] px-4 py-2 text-white transition duration-300 hover:bg-blue-700'
                      >
                        <div className='flex items-center justify-center space-x-1'>
                          <HiOutlineDocumentAdd className='h-6 w-6' />
                          <div>Add Bio</div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          setIsOpen={() => setIsOpen(false)}
          title='Add Bio'
          customWidth='w-[70vh]'
          buttonText='Save'
          handler={handleSaveBio}
        >
          {isEditorLoading && ( // Show loader while the editor is initializing
            <div className='flex h-20 items-center justify-center'>
              <div className='h-10 w-10 animate-spin rounded-full border-t-2 border-blue-500'></div>
            </div>
          )}
          <Editor
            apiKey='eycdh8k4ejq9nylgatmemrpxk0j5tmihnzru6zjxo1881ayn' // Optional if using self-hosted TinyMCE
            onInit={(_: unknown, editor: TinyMCEEditor) => {
              editorRef.current = editor;
              setIsEditorLoading(false); // Hide loader when editor is ready
            }}
            initialValue={profile?.aboutMe}
            init={{
              height: 300,
              menubar: false,
              plugins: ["emoticons", "lists", "link", "image", "table", "code"],
              toolbar:
                "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | emoticons link image table | code",
              content_style:
                "body { font-family:Arial,sans-serif; font-size:14px }",
              menu: {
                insert: { title: "Insert", items: "emoticons" },
              },
              branding: false,
              placeholder: "Write your bio here...",
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default Bio;

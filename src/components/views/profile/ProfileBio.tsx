import Modal from "@/components/common/Modal";
import { useBioHandlers } from "@/lib/hooks/profile/bio/useBioHandlers";
import { useEffect, useRef, useState } from "react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { Editor } from "@tinymce/tinymce-react";
import useGetUsers from "@/lib/hooks/useGetUsers";
import { Editor as TinyMCEEditor } from "tinymce";
import { useParams } from "next/navigation";
import { BioType } from "@/lib/types/profile";
import { CKEditor } from "ckeditor4-react";

interface BioProps {
  data: BioType;
}

const Bio: React.FC<BioProps> = ({ data }) => {
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(data);
  const [isEditorLoading, setIsEditorLoading] = useState(false);
  const { data: aboutMe, refetch, isLoading } = useGetUsers();
  const { addBioData } = useBioHandlers(refetch);
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [bioContent, setBioContent] = useState("");

  useEffect(()=>{
    setBioContent(profile?.aboutMe);
  },[])

  const handleEditorChange = (evt: any) => {
    const data = evt.editor.getData();
    setBioContent(data);
  };
  const handleSaveBio = async () => {
    console.log(bioContent,"bioContent");
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
  };
  return (
    <>
      <div className='lg:gap-7.5 flex h-[100%] flex-col gap-5'>
        <div className='card h-[100%] max-h-[290px]'>
          <div className='card-header flex items-center justify-between'>
            <h3 className='card-title'>Edit Bio</h3>
            {!params.id && (
              <button
                className='btn btn-sm btn-icon text-primary hover:bg-primary-hover hover:text-white'
                onClick={() => setIsOpen(true)}
              >
                <i className='ki-filled ki-notepad-edit'></i>
              </button>
            )}
          </div>

          <div className='card-body'>
            <div className='mb-2 flex flex-wrap gap-2.5  '>
              <div className='m-auto  flex  items-center justify-center w-full h-[200px]'>
                <div className='flex h-full flex-col flex-wrap items-center justify-center  w-full  '>
                  {profile?.aboutMe ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: profile.aboutMe }}
                      className='styled-content text-left text-gray-700  w-full h-full overflow-y-auto'
                    />
                  ) : (
                    <div className='flex flex-col items-center justify-center text-center'>
                      <div>No bio found, still some work to do...😄</div>
                      {!params.id && (
                        <button
                          onClick={() => setIsOpen(true)}
                          className='btn-primary relative mb-4 mt-2 rounded bg-[#0d6efd] px-4 py-2 text-white transition duration-300 hover:bg-blue-700'
                        >
                          <div className='flex items-center justify-center space-x-1'>
                            <HiOutlineDocumentAdd className='h-6 w-6' />
                            <div>Add Bio</div>
                          </div>
                        </button>
                      )}
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
          {isEditorLoading && (
            <div className='flex h-20 items-center justify-center'>
              <div className='h-10 w-10 animate-spin rounded-full border-t-2 border-blue-500'></div>
            </div>
          )}
       

          <CKEditor
            initData={bioContent}
            onChange={handleEditorChange}
            config={{
              versionCheck: false,
              height: 300,
              toolbar: [
                ["Bold", "Italic", "Underline", "Strike"],
                ["NumberedList", "BulletedList"],
                ["Link", "Unlink"],
                ["Table", "Image"],
                ["Source"],
              ],
              removePlugins: "elementspath", 
              removeDialogTabs: "link:target;link:advanced",
            }}
            onInstanceReady={(event) => {
              editorRef.current = event.editor;
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default Bio;

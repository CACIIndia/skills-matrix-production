export default function SkillsPage() {
  return (
    <div className="container-fixed">
  
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5">
       <div className="col-span-2">
          <div className="flex flex-col gap-5 lg:gap-7.5">
             <div className="flex flex-col gap-5 lg:gap-7.5">
                <div className="card">
                   <div className="card-header">
                      <h3 className="card-title">
                         Skills
                      </h3>
                   </div>
                   <div className="card-body">
                      <div className="flex flex-wrap gap-2.5 mb-2">
                         <span className="badge badge-sm badge-success">
                            Web Design
                         </span>
                         <span className="badge badge-sm badge-success badge-outline">
                            Code Review
                         </span>
                         <span className="badge badge-sm badge-danger">
                            Figma
                         </span>
                         <span className="badge badge-sm badge-danger badge-outline">
                            Product Development
                         </span>
                         <span className="badge badge-sm badge-info">
                            Webflow
                         </span>
                         <span className="badge badge-sm badge-info  badge-outline">
                            Webflow
                         </span>
                         <span className="badge badge-sm badge-warning badge-outline">
                            AI
                         </span>
                         <span className="badge badge-sm badge-warning">
                            AI
                         </span>
                         <span className="badge badge-sm badge-primary badge-outline">
                            noCode
                         </span>
                         <span className="badge badge-sm badge-primary">
                            noCode
                         </span>
                      </div>
                   </div>
                </div>

             </div>
          </div>
       </div>
       <div className="col-span-1 text-start">
                     <div className="grid gap-5 lg:gap-7.5">                        
                        <div className="card">
                           <div className="card-header">
                              <h3 className="card-title">
                                 Legend
                              </h3>
                           </div>
                           <div className="card-body">
                              <div className="grid gap-5">
                                 <div className="flex align-start gap-3.5">
                                    <div className="flex items-center justify-center">
                                       <span className="badge badge-sm badge-outline w-14 h-7">
                                       
                                       </span>
                                    </div>
                                    <div className="flex flex-col">
                                       <span className="text-sm font-medium text-gray-800">
                                          Not Selected
                                       </span>
                                       <span className="text-xs font-medium text-gray-500">
                                          No knowledge of the skill
                                       </span>
                                    </div>
                                 </div>
                                 <div className="flex align-start gap-3.5">
                                    <div className="flex items-center justify-center">
                                       <span className="badge badge-sm badge-danger w-14 h-7">
                                          
                                       </span>
                                    </div>
                                    <div className="flex flex-col">
                                       <span className="text-sm font-medium text-gray-800">
                                          1 | Novice
                                       </span>
                                       <span className="text-xs font-medium text-gray-500">
                                          Some knowledge but would need support
                                       </span>
                                    </div>
                                 </div>
                                 <div className="flex align-start gap-3.5">
                                    <div className="flex items-center justify-center">
                                       <span className="badge badge-sm badge-warning w-14 h-7">
                                         
                                       </span>
                                    </div>
                                    <div className="flex flex-col">
                                       <span className="text-sm font-medium text-gray-800">
                                          2 | Proficient
                                       </span>
                                       <span className="text-xs font-medium text-gray-500">
                                          Can comfortably complete work independently
                                       </span>
                                    </div>
                                 </div>
                                 <div className="flex align-start gap-3.5">
                                    <div className="flex items-center justify-center">
                                       <span className="badge badge-sm badge-success w-14 h-7">
                                          
                                       </span>
                                    </div>
                                    <div className="flex flex-col">
                                       <span className="text-sm font-medium text-gray-800">
                                          3 | Expert
                                       </span>
                                       <span className="text-xs font-medium text-gray-500">
                                          Would be comfortable training in this subject
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
    </div>
 
 </div>
  );
}




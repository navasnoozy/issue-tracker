'use client'
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";
const IssueForm = dynamic( ()=> import ("../_components/IssueForm"),{
 ssr:false,
  loading : ()=> <IssueFormSkeleton />
})

//ADD NEW ISSUE
const Newpage = () => {
  return <IssueForm />;
};

export default Newpage;

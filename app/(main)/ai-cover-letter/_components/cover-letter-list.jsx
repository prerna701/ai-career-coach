// "use client";

// import { useRouter } from "next/navigation";
// import { format } from "date-fns";
// import { Edit2, Eye, Trash2 } from "lucide-react";
// import { toast } from "sonner";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { deleteCoverLetter } from "@/actions/cover-letter";

// export default function CoverLetterList({ coverLetters }) {
//   const router = useRouter();

//   const handleDelete = async (id) => {
//     try {
//       await deleteCoverLetter(id);
//       toast.success("Cover letter deleted successfully!");
//       router.refresh();
//     } catch (error) {
//       toast.error(error.message || "Failed to delete cover letter");
//     }
//   };

//   if (!coverLetters?.length) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>No Cover Letters Yet</CardTitle>
//           <CardDescription>
//             Create your first cover letter to get started
//           </CardDescription>
//         </CardHeader>
//       </Card>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {coverLetters.map((letter) => (
//         <Card key={letter.id} className="group relative ">
//           <CardHeader>
//             <div className="flex items-start justify-between">
//               <div>
//                 <CardTitle className="text-xl gradient-title">
//                   {letter.jobTitle} at {letter.companyName}
//                 </CardTitle>
//                 <CardDescription>
//                   Created {format(new Date(letter.createdAt), "PPP")}
//                 </CardDescription>
//               </div>
//               <div className="flex space-x-2">
//                 <AlertDialog>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
//                   >
//                     <Eye className="h-4 w-4" />
//                   </Button>
//                   <AlertDialogTrigger asChild>
//                     <Button variant="outline" size="icon">
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>Delete Cover Letter?</AlertDialogTitle>
//                       <AlertDialogDescription>
//                         This action cannot be undone. This will permanently
//                         delete your cover letter for {letter.jobTitle} at{" "}
//                         {letter.companyName}.
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel>Cancel</AlertDialogCancel>
//                       <AlertDialogAction
//                         onClick={() => handleDelete(letter.id)}
//                         className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//                       >
//                         Delete
//                       </AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="text-muted-foreground text-sm line-clamp-3">
//               {letter.jobDescription}
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Eye, Trash2, Building2 } from "lucide-react"; // Added Building2 import
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/actions/cover-letter";

export default function CoverLetterList({ coverLetters }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  if (!coverLetters?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Cover Letters Yet</CardTitle>
          <CardDescription>
            Create your first cover letter to get started
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {coverLetters.map((letter) => (
        <Card key={letter.id} className="group relative ">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className="text-xl gradient-title">
                    {letter.jobTitle}
                  </CardTitle>
                  {/* Removed Badge component since it's not in your original code */}
                </div>
                <CardDescription className="flex items-center gap-2 text-base">
                  <Building2 className="h-4 w-4" />
                  {letter.companyName}
                </CardDescription>
                <CardDescription>
                  Created {format(new Date(letter.createdAt), "PPp")}
                </CardDescription>
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
                  className="h-9 w-9"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="h-9 w-9 text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Cover Letter?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your cover letter for{" "}
                        <strong>{letter.jobTitle}</strong> at{" "}
                        <strong>{letter.companyName}</strong>.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(letter.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-sm line-clamp-2 bg-muted/30 p-3 rounded-lg">
              {letter.jobDescription.substring(0, 200)}
              {letter.jobDescription.length > 200 && "..."}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
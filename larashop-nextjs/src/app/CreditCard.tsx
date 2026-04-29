import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

const CreditCard = () => {
    return (
        <form> 
         <div className="space-y-3 sm:space-y-5">
             <div>
               <Label>カード番号</Label>
               <Input className="mt-1.5" defaultValue="" />
             </div>
             <div>
               <Label>名義</Label>
               <Input className="mt-1.5" defaultValue="" />
             </div>
             <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
               <div className="flex-1">
                 <Label className="text-sm">有効期限 (MM/YY)</Label>
                 <Input
                   autoComplete="off"
                   className="mt-1.5"
                   placeholder="MM/YY"
                 />
               </div>
               <div className="flex-1">
                 <Label className="text-sm">CVC</Label>
                 <Input
                   autoComplete="off"
                   className="mt-1.5"
                   placeholder="CVC"
                 />
               </div>
             </div>

         </div>
        </form>
    )
}

export default CreditCard
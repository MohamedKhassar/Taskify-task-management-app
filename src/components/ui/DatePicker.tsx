import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState, type Dispatch, type SetStateAction } from "react"
import type { Task } from "@/utils/types"

export function DatePicker({ setTaskData, dueDate }: { setTaskData: Dispatch<SetStateAction<Task>>, dueDate: Date | undefined }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
                Due Date
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal"
                    >
                        {dueDate ? new Date(dueDate).toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={dueDate}
                        fromYear={new Date().getFullYear()}
                        fromMonth={new Date()}
                        fromDate={new Date()}
                        captionLayout="dropdown"
                        onSelect={(dueDate) => {
                            if (dueDate) {
                                setTaskData(prev => ({
                                    ...prev,
                                    dueDate  // only convert if dueDate is defined
                                }))
                            } setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

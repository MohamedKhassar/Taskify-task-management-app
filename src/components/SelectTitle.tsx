import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { userTitles } from "@/utils/data"

export function SelectTitle() {
    return (
        <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your title" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup className="max-h-48 overflow-y-auto">
                    {
                        userTitles.map((title) => (
                            <SelectItem key={title} value={title}>{title}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarView } from "@/components/calendar/calendar-view"

const formSchema = z.object({
  type: z.string(),
  schedulingMode: z.string(),
  autoSchedule: z.boolean(),
  startNewSeason: z.boolean(),
})

export function TournamentSettings({ id }: { id: string }) {
  const [calendarOpen, setCalendarOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "poules",
      schedulingMode: "automatic",
      autoSchedule: true,
      startNewSeason: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Teams</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Current Teams</div>
              <div className="grid grid-cols-2 gap-2">
                {["Arsenal", "Chelsea", "Liverpool", "Man City", "Tottenham", "Man United"].map((team) => (
                  <div key={team} className="flex items-center gap-2 p-2 border rounded-md">
                    <div className="h-6 w-6 rounded-full bg-muted" />
                    <span className="text-sm">{team}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                Add/Remove Teams
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tournament Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tournament Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="knockout">Knockout</SelectItem>
                          <SelectItem value="poules">Poules</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Changing the tournament type will reset the current schedule.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="schedulingMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scheduling Mode</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="autoSchedule"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Auto Schedule Matches</FormLabel>
                        <FormDescription>Automatically schedule matches based on team availability.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startNewSeason"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Start New Season</FormLabel>
                        <FormDescription>This will archive the current season and start a new one.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-md bg-muted/30 min-h-[300px] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-lg font-medium">Calendar View</div>
              <div className="text-sm text-muted-foreground">
                A drag-and-drop calendar for match scheduling would be displayed here.
              </div>
              <Button variant="outline" onClick={() => setCalendarOpen(true)}>
                Open Calendar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Dialog */}
      <Dialog open={calendarOpen} onOpenChange={setCalendarOpen}>
        <DialogContent className="max-w-[90vw] w-[1400px] max-h-[90vh] h-[800px] p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Tournament Schedule Calendar</DialogTitle>
          </DialogHeader>
          <div className="p-2 h-full overflow-hidden">
            <CalendarView />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

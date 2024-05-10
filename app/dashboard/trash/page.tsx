import FileBrowser from "@/components/shared/FileBrowser"

const TrashPage = () => {
  return (
    <div>
        <FileBrowser title="Deleted Files" deletedOnly />
    </div>
  )
}
export default TrashPage
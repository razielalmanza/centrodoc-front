import { Button, Dialog, DialogActions, DialogTitle, Fab } from "@material-ui/core";
import { useContext, useState } from "react";
import { Permisos } from "../../types";
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import { ApiContext, AuthContext } from "../../context";
import { userHasPermissionToAccess } from "../../utils";
import { useToasts } from "react-toast-notifications";

interface BorraItemProps {
  requieredPermission: Permisos[],
  itemType: string,
  idItem: number,
  bajaApi: any,
}

export const BorraItemComponent = (props: BorraItemProps) => {
  const { requieredPermission, itemType, idItem, bajaApi } = props;
  const { user } = useContext(AuthContext);
  const [ open, setOpen ] = useState(false);
  const { addToast } = useToasts();
  const { requestApi } = useContext(ApiContext);

  const handleClose = () => setOpen(false);

  const onSubmit = async () => {
    const userHasPermission: boolean = await userHasPermissionToAccess(requieredPermission, user?.permisos);
    if(userHasPermission) {
      const { success, message } = await requestApi(bajaApi(idItem));
      if(success)
        addToast(message, { appearance: 'success' });
    } else {
      addToast(`Usuario ${user?.usuario.firstName} no tiene permiso para borrar.`, { appearance: 'warning' });
    }
    handleClose();
  }

  return (
  <div>
    <Button size="large" color="primary" onClick={() => setOpen(true)}>
      <DeleteIcon />
    </Button>
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{`¿Dar de baja el ${itemType} con id [${idItem}]?`}</DialogTitle>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>Cancelar</Button>
        <Button onClick={onSubmit}>Dar de baja</Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}
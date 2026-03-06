import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { StatusIcon } from "../StatusIcon";
import { Trash2 } from "lucide-react-native";

type Item = {
    status: FilterStatus;
    description: string;
}

type ItemProps = {
    data: Item;
    onRemove: () => void;
    onChangeStatus: () => void;
}

export function Item({ data, onChangeStatus, onRemove }: ItemProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={onChangeStatus}>
                <StatusIcon status={data.status} />
            </TouchableOpacity>

            <Text style={styles.description}>{data.description}</Text>

            <TouchableOpacity onPress={onRemove}>
                <Trash2 size={18} color="#828282" />
            </TouchableOpacity>
        </View>
    )
}